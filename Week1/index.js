const express = require('express')
const app = express()
const session= require("express-session")
const UserService = require('./Services/UserService')
const AttractionService = require('./Services/AttractionService')
const APIKeyService = require('./Services/APIKeyService')
const apiValidation = require('./Middleware/APIKeyValidation')
const checkSession = require('./Middleware/SessionAuth/SessionAuth')
const path = require('path');

app.set("view engine", "ejs");
app.set('views', './views');

const PORT_NUMBER = 3000;
app.use(express.json())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24*60*60*1000,
    }
}))

app.use(express.static('public'))
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/api', apiValidation);

// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUnitialized: false,
//     cookie: {
//         secure: false,
//         httpOnly: true,
//         maxAge: 24*60*60*1000
//     }
// }))

app.get('/', (req, res)=>{
    res.send("<h1>Welcome to the Home page</h1>")
})

app.get('/ejstest', async (req, res) => {
    const data =  {fn: 'Donald', ln: 'Trump'}
    res.render('home', {data}); 
})

app.get('/attractions', async (req, res) => {
    res.render('attractions')
})

app.get('/contact', checkSession, (req, res)=>{
    res.sendFile(__dirname + '/views/index.html')
})

// app.get('/testdata', (req, res)=> {
//     res.json(data)
// })

app.get('/api/attractions', async (req,res)=>{
    const attractionService = new AttractionService();
    const data = await attractionService.getAll();
    res.json(data.data)
    // res.render('ejsLoopTest', {data});
})

app.post('/newRecord', async (req, res) => {
    const attractionService = new AttractionService();
    const results = await attractionService.create(req);
    res.json(results);
});

app.post('/newRecord', async (req,res)=> {
    this.attractionService = new AttractionService()
    const results = await this.attractionService.create(req)
    res.json(results)
})

app.get('/create', async (req,res)=>{
    res.sendFile(__dirname + '/views/createForm.ejs')
})

app.post('/createAPIKey', async (req, res) => {
    this.apikeyservice = new APIKeyService();
    const result = await this.apikeyservice.create(req.body.owner);
    res.json(result);
})

app.get('/createKey', async (req,res)=>{
    res.sendFile(__dirname + '/views/createKey.html')
})

app.post('/registerUser', async (req,res)=>{
    const userservice = new UserService();
    const result = await userservice.create(req);
    res.json(result);
})

app.post('/login', async (req,res)=>{
    const userservice = new UserService();
    const result = await userservice.authenticate(req);
    res.json(result);
})

app.listen(PORT_NUMBER);