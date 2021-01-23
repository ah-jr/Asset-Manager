if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const methodOverride = require ('method-override')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const Chart = require('chart.js');


const initializePassport = require('./passport-config')
const e = require('express')
initializePassport(passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)


const users = []

app.set('view-engine', 'ejs')
app.use(methodOverride ('_method'))
app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static("public"));


app.get('/', (req,res) => {
    if(req.user == undefined) res.render('notlogged.ejs')
    else res.render('index.ejs', {user: req.user})
})

app.get('/index', (req,res) => {
    if(req.user == undefined) res.render('notlogged.ejs')
    if(req.body.value != undefined){
        res.redirect('register.ejs')
    }
    else res.render('index.ejs', {user: req.user})
})

app.post('/index', async (req, res) => {
    if (req.body.title != undefined){
        req.user.expenses.push({
            title: req.body.title,
            amount: req.body.amount,
            date: req.body.date
        })
        console.log(req.body.date)
        req.user.cont += 1
    }
    else if (req.body.remove != undefined){
        req.user.expenses.splice(req.body.remove, 1)
        req.user.cont -= 1
    }
    else if (req.body.windowLeft != undefined){
        req.user.UI[req.body.windowType][0] = req.body.windowLeft
        req.user.UI[req.body.windowType][1] = req.body.windowTop
    }

    if (req.body.ajax == undefined) res.render('index.ejs', {user: req.user})
    else res.send(req.user)
})


app.get('/login', (req, res) => {
    res.render('login.ejs')})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', (req, res) => {
    res.render('register.ejs')})

app.post('/register', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            expenses: [],
            cont: 0,
            UI: [["18%", "25%"], ["50%", "25%"],["82%", "25%"], ["18%", "75%"]]
        })
        res.redirect('/login')
    } catch{
        res.redirect('/register')
    }
    console.log(users)
})

app.delete("/logout", (req, res) => {
    req.logOut()
    res.redirect('/login')
})


app.listen(3000)
