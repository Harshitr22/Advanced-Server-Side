const express = require('express')
const app = express()
const UserService = require('./Services/UserService')
const AttractionService = require('./Services/AttractionService')
const APIKeyService = require('./Services/APIKeyService')
const apiValidation = require('./Middleware/APIKeyValidation')
const {checkSession} = require('./Middleware/SessionAuth/SessionAuth')
const session = require('session')

const PORT_NUMBER = 3000;

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUnitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24*60*60*1000
    }
}))

app.use(express.json())

app.use(express.static('public'))

app.use('/api', apiValidation);

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

app.get('/contact', checkSession, (req, res)=>{
    res.sendFile(__dirname + '//views//index.html')
})

app.get('/testdata', (req, res)=> {
    res.json(data)
})

app.get('/api/attractions', async (req,res)=>{
    this.attractionService = new AttractionService()
    const data = await this.attractionService.getAll()
    res.json(data)
})

app.get('/attractions/del/:name', async (req,res)=>{
    const attraction = req.params.name;
    this.attractionService = new AttractionService()
    const data = await this.attractionService.deleteAttraction(attraction)
    res.json(data)
})

app.post('/newRecord', async (req,res)=> {
    this.attractionService = new AttractionService()
    const results = await this.attractionService.create(req)
    res.json(results)
})

app.get('/create', async (req,res)=>{
    res.sendFile(__dirname + '//views/createForm.html')
})

app.post('/createAPIKey', async (req, res) => {
    this.apikeyservice = new APIKeyService();
    const result = await this.apikeyservice.create(req.body.owner);
    res.json(result);
})

app.get('/createKey', async (req,res)=>{
    res.sendFile(__dirname + '//views/createKey.html')
})

app.post('/registerUser', async (req,res)=>{
    const userservice = new UserService();
    const result = userservice.create(req);
    res.json(result);
})

app.post('/login', async (req,res)=>{
    const userservice = new UserService();
    const result = await userservice.authenticate(req);
    res.json(result);
})

app.listen(PORT_NUMBER);