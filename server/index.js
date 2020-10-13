const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();
const port = 4004;

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/:hotelName', (req, res) => {
  const fileName = 'index.html';
  const options = {
    root: path.join(__dirname, '../dist')
  };
  res.sendFile(fileName, options, (err) => {
    if(err) {
      console.error(err);
      return;
    } else {
      console.log('success')
      return;
    }
  })
})

app.get('/api/low-days/:id', (req, res) => {
  axios({
    method: "GET",
    url: `http://localhost:4002/api/low-days/${req.params.id}`
  })
  .then((result) => {
    res.send(result.data)
  })
  .catch((err) => {
    console.log(err)
  })
})

app.get('/api/hotel/:hotelId', (req, res) => {
  axios({
    method: "GET",
    url: `http://localhost:4001/api/hotel/${req.params.hotelId}`
  })
  .then((results) => {
    res.send(results.data);
  })
  .catch((err) => {
    console.log(err)
  })
})

app.get('/api/pictures/:hotelId', (req, res) => {
  var hotelId = req.params.hotelId
  axios({
    method: "GET",
    url: `http://localhost:4000/api/pictures/${hotelId}`,
  })
  .then((results) => {
    res.send(results.data)
  })
  .catch((err) => {
    console.log(err)
  })
})

app.get('/hotel/:hotel', (req, res) => {
  let hotel = req.params.hotel === 'root'? 'hotel0': req.params.hotel;
  axios({
    method: "GET",
    url: `http://localhost:4003/hotel/${hotel}`
  })
  .then((results) => {
    res.send(results.data)
  })
  .catch((err) => {
    console.log(err)
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})