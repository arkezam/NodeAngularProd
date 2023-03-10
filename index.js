const express = require('express');
const cors = require('cors');
const { dbConection } = require('./db/config');
const path = require('path')
require('dotenv').config();
const mongoose = require("mongoose");
const app = express();
// directorio publico
app.use(express.static('public'))

// cors
app.use(cors())


//lectura y parseo del body
app.use(express.json());

// base de datos
dbConection();


app.get('/ip',function(req, res) {
  const ipAddress = req.socket.remoteAddress;
  res.send(ipAddress);
});
//Rutas
app.use( '/api/auth', require('./routes/auth') )


app.get('*', (req, res)=>{
   res.sendFile(path.resolve(__dirname,'public/index.html')); 
 })



PORT = process.env.PORT
app.listen(PORT, m =>{
    console.log(`Servidor Arrancado en el puerto ${PORT}`)
})