const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios')
const h5bp = require('h5bp');
require('newrelic');

const app = express();
app.use(h5bp({ root: __dirname + '../dist' }));
const port = 4004;

app.use(express.compress());
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/loaderio-f27da2ca8543e01c3e710f2b68eb6a9a.txt', express.static(path.join(__dirname, '..//loaderio-f27da2ca8543e01c3e710f2b68eb6a9a.txt')));

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
  // change IP address below
  axios({
    method: "GET",
    url: `http://54.151.74.28:4001/api/hotel/${req.params.hotelId}`
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