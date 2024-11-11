const prisma = require("../config/prisma")

exports.listUsers = async (req,res)=>{
    try {
        const users = await prisma.user.findMany({
            select:{
                id: true,
                email: true,
                role: true,
                enabled: true,
                address: true
            }
        })

        res.send(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Search Error"})
    }
}

exports.changeStatus = async (req,res)=>{
    try {
        const { id , enabled } = req.body

        const user = await prisma.user.update({
            where: { id:Number(id) },
            data: { enabled: enabled }
        })
        
        res.send('Update Status Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Search Error"})
    }
}

exports.changeRole = async (req,res)=>{
    try {
        const { id , role } = req.body
        console.log(id , role);
        const user = await prisma.user.update({
            where: { id:Number(id) },
            data: { role: role }
        })
        res.send('Update Role Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Search Error"})
    }
}

exports.userCart = async (req,res)=>{
    try {
        const { cart } = req.body

        const user = await prisma.user.findFirst({
            where: { id: Number(req.user.id) }
        })

        // product quantity check
        for(const item of cart){
            // console.log(item)
            const product = await prisma.product.findUnique({
                where: { id: item.id },
                select: { quantity: true, title: true }
            })
            if(!product || item.count > product.quantity){
                return res.status(400).json({
                    ok: false,
                    message: `Sorry, ${product?.title || 'product'} is out of stock`
                })
            } 
        }

        // Clear cart
        await prisma.productOnCart.deleteMany({
            where:{
                cart: { orderedById: user.id }
            }
        })

        await prisma.cart.deleteMany({
            where: { orderedById: user.id}
        })

        let products = cart.map((item)=>({
            productId: item.id,
            count: item.count,
            price: item.price
        }))
        console.log(products);
        
        let cartTotal = products.reduce((sum,item)=>
            sum + item.price * item.count,0
        )

        const newCart = await prisma.cart.create({
            data:{
                products: { 
                    create: products
                },
                cartTotal: cartTotal,
                orderedById: user.id
            }
        })

        res.send('Add Cart Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Search Error"})
    }
}

exports.getUserCart = async (req,res)=>{
    try {
        const cart = await prisma.cart.findFirst({
            where:{
                orderedById: Number(req.user.id)
            },
            include:{
                products:{
                    include:{
                        product: true
                    }
                }
            }
        })

        res.json({
            products: cart.products,
            cartTotal: cart.cartTotal
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Search Error"})
    }
}

exports.emptyCart = async (req,res)=>{
    try {
        const cart = await prisma.cart.findFirst({
            where: { orderedById: Number(req.user.id) }
        })
        if(!cart){
            return res.status(400).json({ message: 'No cart'})
        }
        await prisma.productOnCart.deleteMany({
            where: { cartId: cart.id }
        })
        const result = await prisma.cart.deleteMany({
            where: { orderedById: Number(req.user.id) }
        })
        console.log(result);
        res.json({
            message: 'Cart Empty Success',
            deletedCount: result.count
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}

exports.saveAddress = async (req,res)=>{
    try {
        const { address } = req.body
        console.log(address);
        const addressUser = await prisma.user.update({
            where: {
                id: Number(req.user.id)
            },
            data: {
                address: address
            }
        })
        res.send({ok: true, message: 'Address update success'})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Search Error"})
    }
}

exports.saveOrder = async (req,res)=>{
    try {
        // step 0 check stripe
        // console.log(req.body)
        // return res.send('hello Jukkru!')
        const { id, amount, status, currency } = req.body.paymentIntent
        const userCart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id)
            },
            include: { products: true }
        })
        // product empty check 
        if(!userCart || userCart.products.length === 0){
            return res.status(400).json({ ok: false, message: 'Cart is empty' })
        }
        
        const amoutTHB = Number(amount) / 100
        // create new order
        const order = await prisma.order.create({
            data: {
                products: {
                    create: userCart.products.map((item)=>({
                        productId: item.productId,
                        count: item.count,
                        price: item.price
                    }))
                },
                orderedBy: {
                    connect: { id: req.user.id }
                },
                cartTotal: userCart.cartTotal,
                stripePaymentId: id,
                amount: amoutTHB,
                status: status,
                currentcy: currency,
            },
        })

        // stripePaymentId String
        // amount Int
        // status String
        // currentcy String


        // update product
        const update = userCart.products.map((item)=>({
            where:{ id: item.productId },
            data: {
                quantity: { decrement: item.count },
                sold: { increment: item.count }
            }
        }))
        console.log(update);
        
        await Promise.all(
            update.map((updated)=> prisma.product.update(updated))
        )
        
        await prisma.cart.deleteMany({
            where: { orderedById: Number(req.user.id)}
        })

        res.json({ ok: true, order})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Search Error"})
    }
}

exports.getOrder = async (req,res)=>{
    try {
        const orders = await prisma.order.findMany({
            where: { orderedById: Number(req.user.id)},
            include:{
                products:{
                    include:{
                        product: true
                        }
                    }
                }
            })
            if(orders.length === 0){
                return res.status(400).json({ ok: false, message: 'No order'})
            }
            console.log(orders);
            
        res.json({ ok: true, orders })
    } catch (error) {
        console.log(err)
        res.status(500).json({ message: "Search Error"})
    }
}