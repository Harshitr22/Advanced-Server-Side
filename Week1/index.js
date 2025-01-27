const express = require('express')
const app = express()
const UserService = require('./Services/UserService')
const AttractionService = require('./Services/AttractionService')
const PORT_NUMBER = 4000;

const data = [
    {
    fname: 'Harshit',
    surname: 'Raj',
    Occupation: 'Student'
    },
    {
        fname: 'Donald',
        surname: 'Trump',
        Occupation: 'President'
    },
    {
        fname: 'Steven',
        surname: 'Segal',
        Occupation: 'Akido Master'
    }]

app.get('/', (req, res)=>{
    res.send("<h1>Welcome to the Home page</h1>")
})

app.get('/contact', (req, res)=>{
    res.sendFile(__dirname + '//views//index.html')
})

app.get('/testdata', (req, res)=> {
    res.json(data)
})

app.get('/attractions', async (req,res)=>{
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

app.get('/attractions/update/:id/:name', async (req,res)=>{
    const id = req.params.id
    const attraction = req.params.name;
    this.attractionService = new AttractionService()
    const data = await this.attractionService.updateAttraction(id, attraction)
    res.json(data)
})


app.listen(PORT_NUMBER)