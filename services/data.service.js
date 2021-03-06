

const db=require('./db');
//let currentUser;
let accountDetails={
    1000:{acno:1000,username:"userone",password:"userone",balance:50000},
    1001:{acno:1001,username:"usertwo",password:"usertwo",balance:5000},
    1002:{acno:1002,username:"userthree",password:"userthree",balance:10000},
    1003:{acno:1003,username:"userfour",password:"userfour",balance:6000}
  }
  
 const register =(uname,acno,pswd)=>{
    

 return db.User.findOne({acno})
.then(user=>{
  console.log(user);
  if(user){
    return {
      statusCode:422,
      status:false,
      message:"User Exit please Login"
  }

  }
  else{
    const newUser=new db.User({
      acno,
      username:uname,
      password:pswd,
      balance:0
    })
    newUser.save();
    return{
      statusCode:200,
     status:true,
     message:"Successfully registerd"
  } 

  }
 
})
  

  }

 const login=(req,accno,password)=>{
  
  var acno=parseInt(accno);
   //console.log(acno)
   
   return db.User.findOne({acno,password})
   .then(user=>{
     //console.log(user)
     if(user){
      req.session.currentUser=user;
      return {
        statusCode:200,
        status:true,
        message:"Successfully Login",
        name:user.username,
        acno:user.acno
      }
     }
     else{
      return{
        statusCode:422,
        status:false,
        message:"Invalid credentials"
    }
     }
   })
  }

  const deposit=(acno,password,amt)=>{
    var amount=parseInt(amt);
    return db.User.findOne({acno,password})
   .then(user=>{
     if(!user){
     return{
        statusCode:422,
        status:false,
        message:"Invalid Credential"
    }
    }
    user.balance+=amount;
    user.save();
    return{
            statusCode:200,
            status:true,
            balance:user.balance,
            message:amount+"credited and new balance is:"+user.balance
    
        }
      })
    }
      
     

  const withdraw=(req,acno,password,amt)=>{
    var amount=parseInt(amt);
    return db.User.findOne({acno,password})
    .then(user=>{
      if(!user){
          return{
          statusCode:422,
          status:false,
          message:"Invalid credential"
      }
    }
    if(req.session.currentUser!=acno){
      return{
        statusCode:422,
        status:false,
        message:"Permission Denied"
      }
    }
    if(user.balance<amount){
      return{
        statusCode:422,
        status:false,
        message:"Insufficient Balance"
      }
    }
    user.balance-=amount;
    user.save();
    return {
      statusCode:200,
      status:true,
      balance:user.balance,
      message:amount+"debited and new balance is: "+user.balance
  }
})
  }

  const deleteAccDetails=(acno)=>{
    return db.User.deleteOne({
      acno:acno
    }).then(user=>{
      if(!user){
        return{
          
          statusCode:422,
          status:false,
          message:"Operation failed"
        }
      }
       return{
        
         statusCode:200,
         status:true,
         message:"Account Number "+acno+" deleted successfully"
       }
    })
  }
  module.exports={
      register,
      login,
      deposit,
      withdraw,
      deleteAccDetails
  }