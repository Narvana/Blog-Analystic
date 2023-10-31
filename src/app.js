const express=require('express');
const app=express();

const port=process.env.PORT || 9000

app.use(express.json())

const blog=require('./route/blog')
app.use('/api',blog)

app.listen(port,()=>{
    console.log(`Connected to port ${port}`)
})