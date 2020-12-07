const request =require('request')


const forecast = (latitude,longitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=a10b8ddd4376f277eb465a4497f32ee8&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather services',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,'Weather is '+body.current.weather_descriptions[0]+' .It is '+body.current.temperature+' out but it feels like '+body.current.feelslike+' out')
        }
    })
}


module.exports=forecast