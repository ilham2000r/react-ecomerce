const prisma = require("../config/prisma")
const stripe = require("stripe")('sk_test_51QIPkWClJYTUZIb8n8BT6q7qJsBdOBJtm8CCtalcsmoBWJ841uWhdoJSy4QFqNk8QT6KuI862v1OpqgapIgeJVWE00tKOhWGOT');

exports.payment = async (req,res)=>{
    try {
        const cart = await prisma.cart.findFirst({
            where:{
                orderedById : req.user.id
            }
        })
        const amoutTHB = cart.cartTotal * 100

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amoutTHB,
            currency: "thb",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
              enabled: true,
            },
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
          });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Search Error"})
    }
}
