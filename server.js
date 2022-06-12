const express = require("express");

const app=express();

const dbConfig=require('./db')
const sportfieldsRoute=require('./routes/sportfieldsRoute')
const usersRoute=require('./routes/usersRoute')
const bookingsRoute=require('./routes/bookingsRoute')

app.use(express.json())
app.use('/api/sportfields', sportfieldsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute)

const port=process.env.PORT || 5001;
app.listen(port, ()=> console.log('Node Server Started using nodemon'));