const express=require('express');
const app= express();

app.get('/',(req,res)=>{
    res.status(401).send("THIS IS A GET METHOD");
});

app.post('/',(req,res)=>{
    res.send("THIS IS A POST METHOD");
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
})