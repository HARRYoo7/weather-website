const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')


// const forecast = require('../../weather-app/utils/forecast')

const app=express()

// define paths for express config
const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials') 

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Harjeet'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Harjeet'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Fuck Off',
        title:'Help',
        name:'Harjeet'
    })
})

app.get('/weather',(req,res)=>{ 
    if(!req.query.address){
        return res.send({
            error:'You must provide a address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,data)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                data:data,
                location:location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        name:'Harjeet',
        message:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        name:'Harjeet',
        message:"page not Found"
    })   
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})