
const LocalStrategy=require('passport-local').Strategy
const passport = require('passport')
const User=require('../models/user')
module.exports= initializePassport=(passport)=>{

passport.use(new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
const userEmail= await User.findOne({email:email})
if(userEmail== null){
    return done(null,false,{message:'incorrect email '})
}
if(userEmail.password===password){
    return done(null,userEmail)
}
else{
    return done(null,false,{message:'incorrect password '})

}
}))


passport.serializeUser((user,done)=>{
    done(null,user.id)
})
 passport.deserializeUser(async(id, done) => {
    try {
        const data=await User.findById(id)
        done(null,data)
    } catch (error) {
        done(error,false )
    }

})
}