const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

exports.register = async(req,res)=>{
    try {
        const { email,password } = req.body
        if(!email){
            return res.status(400).json({ message: 'email is required'})
        }
        if(!password){
            return res.status(400).json({ message: 'password is required'})
        }

        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        if(user){
            return res.status(400).json({ message: "email already exits"})
        }
        const hashPassword = await bcrypt.hash(password,10)
        
        await prisma.user.create({
            data:{
                email : email,
                password : hashPassword
            }
        })

        res.send('Register Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}

exports.login = async(req,res)=>{
    try {
        const { email, password } = req.body

        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        if(!user || !user.enabled){
            return res.status(400).json({ message: ' User Not found or not Enable'})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) {
            return res.status(400).json({ message: ' Password invalid'})
        }
        
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        jwt.sign(payload,process.env.SECRET,{expiresIn: '1d'}
            , (err,token)=>{
            if(err){
                return res.status(500).json({ message: 'Server error'})
            }
            res.json({ payload, token })
        }
    )
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}

exports.currentUser = async(req,res)=>{
    try {
        const user = await prisma.user.findFirst({
            where: { email: req.user.email },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        })
        res.json({user})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}