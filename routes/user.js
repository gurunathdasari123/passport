const express=require('express')
const router=express.Router()
const User=require('../models/user')
const passport=require('passport')


router.get('/register',(req,res)=>{
res.render('register')
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/profile',isAuthenticated,(req,res)=>{
    res.render('profile')
})
router.post('/register',async(req,res)=>{

const newUser=new User({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    phoneNumber:req.body.phoneNumber
})
try {
    const data=await newUser.save()
    res.redirect('/login')
} catch (error) {
    console.log(error)
}



})

// Handle Login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
  }));


router.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if (err) { return next(err); }
        res.redirect('/login');
      });
    
})

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    else{
        res.redirect('/login')
    }
}

module.exports=router