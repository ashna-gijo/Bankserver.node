const express=require('express');
const session=require('express-session');
const cors=require('cors');
const dataService=require('./services/data.service');
const app= express();

app.use(cors({
    origin:'http://192.168.43.177:8080',
    //origin:' http://localhost:4200',
    credentials:true
}))
app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}));

app.use(express.json());

//Middleware
app.use((req,res,next)=>{
    console.log("Middleware");
    next();
})
const logMiddleware=(req,res,next)=>{
    console.log(req.body);
    next();
}
//app.use(logMiddleware);

const authMiddleware=(req,res,next)=>{
    if(!req.session.currentUser){
        return res.json({
            statusCode:401,
            status:false,
            message:"Please Log In"
        })
    }
    else{
        next();
    }
}

//GET Method-READ
app.get('/',(req,res)=>{
    res.status(401).send("THIS IS A GET METHOD");
});

//POST Method-CREATE

app.post('/',(req,res)=>{
    res.send("THIS IS A POST METHOD");
});

//Register
app.post('/register',(req,res)=>{
    const result=dataService.register(req.body.uname,req.body.acno,req.body.pswd)
    .then(result=>{
    res.status(result.statusCode).json(result)
   //res.status(200).send("success")
    }) 
    
    
});

//login
app.post('/login',(req,res)=>{
    dataService.login(req,req.body.acno,req.body.pswd) 
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
});


//Deposit
app.post('/deposit',authMiddleware,(req,res)=>{
    dataService.deposit(req.body.acno,req.body.pswd,req.body.amount) 
    .then(result=>{
        res.status(result.statusCode).json(result)
        })
});
//Withdraw
app.post('/withdraw',authMiddleware,(req,res)=>{
    dataService.withdraw(req,req.body.acno,req.body.pswd,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)
        })
});


//PUT Method
app.put('/',(req,res)=>{
    res.send("THIS IS A PUT METHOD");
});

//PATCH Method
app.patch('/',(req,res)=>{
    res.send("THIS IS A PATCH METHOD");
});

//DELETE Method
app.delete('/',(req,res)=>{
    res.send("THIS IS A DELETE METHOD");
});

//DELETE Method
app.delete('/deleteAccDetails/:acno',authMiddleware,(req,res)=>{
    dataService.deleteAccDetails(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
        })  
});

app.listen(3000,()=>{
console.log("server created at port: 3000");
});