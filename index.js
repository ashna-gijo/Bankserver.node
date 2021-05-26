const express=require('express');
const dataService=require('./services/data.service');
const app= express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(401).send("THIS IS A GET METHOD");
});

app.post('/',(req,res)=>{
    res.send("THIS IS A POST METHOD");
});

app.post('/register',(req,res)=>{
    const result=dataService.register(req.body.uname,req.body.acno,req.body.pswd); 
       console.log(res.status(result.statusCode).json(result));
});


app.post('/login',(req,res)=>{
    const result=dataService.login(req.body.acno,req.body.pswd); 
       console.log(res.status(result.statusCode).json(result));
});


app.put('/',(req,res)=>{
    res.send("THIS IS A PUT METHOD");
});
app.patch('/',(req,res)=>{
    res.send("THIS IS A PATCH METHOD");
});
app.delete('/',(req,res)=>{
    res.send("THIS IS A DELETE METHOD");
});

app.listen(3000,()=>{
console.log("server created at port: 3000");
});