
require('dotenv').config();
const express = require('express');
const app = express();
const imageDataURI = require('image-data-uri');
let PORT = process.env.PORT || 4000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req, res, err) => {
  let url = 'https://maps.googleapis.com/maps/api/staticmap?center='
  
  if(req.query.city) {
    url += req.query.city
  }

  if(req.query.size) {
    url += `&size=${req.query.size}`
  }

  if(req.query.maptype) {
    url += `&maptype=${req.query.maptype}`
  }


  url += `&key=${process.env.APIKEY}&saturation=100`

  imageDataURI.encodeFromURL(url)
    .then(resp => {
      res.json(resp)
      console.log('visited')
    })
    .catch((err) => console.log(err))

  
})

app.listen(PORT, () => console.log('logging...'))