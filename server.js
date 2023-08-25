const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const session=require('express-session')
require('dotenv').config()
const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const app=express()
const initializePassport=require('./config/passportConfig')
initializePassport(passport,)

app.set('view engine','ejs')
app.set('views','./views')


//middleware
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret:'guru',
    saveUninitialized:false,
    resave:false
}))
app.use(passport.initialize())
app.use(passport.session())


//database connection
mongoose.connect('mongodb://localhost:27017/passport',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('database connection success')
})
.catch((err)=>{
    console;e.log(err)
})



//routes
const userRouter=require('./routes/user')

app.use('/',userRouter)




//server
app.listen(3000)