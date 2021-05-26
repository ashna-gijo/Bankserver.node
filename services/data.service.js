
let currentUser
let accountDetails={
    1000:{acno:1000,username:"userone",password:"userone",balance:50000},
    1001:{acno:1001,username:"usertwo",password:"usertwo",balance:5000},
    1002:{acno:1002,username:"userthree",password:"userthree",balance:10000},
    1003:{acno:1003,username:"userfour",password:"userfour",balance:6000}
  }
  
 const register =(uname,acno,pswd)=>{
    
    let user=accountDetails;
    if(acno in user){
        
      return {
          statusCode:422,
          status:false,
          message:"User Exit please Login"
      }
    
  } 
  else{
    user[acno]={
      acno,
      username:uname,
      password:pswd,
      balance:0
    }
    
 return{
     statusCode:200,
    status:true,
    message:"Succesfully registerd"
 } 
  
  }

  }

 const login=(acno,pswd)=>{
    let user=accountDetails;
    
    if(acno in user){
        if(pswd==user[acno]["password"]){
          currentUser=user[acno]["password"]
          
          return {
              statusCode:200,
              status:true,
              message:"Successfuly Login"
            
        }}
        else{
            return{
                statusCode:422,
                status:false,
                message:"Incorrect Password"
            }
            
        }
    }
    else{
        return{
            statusCode:422,
            status:false,
            message:"Invalid Account"
        }
        
    }

  }
  module.exports={
      register,
      login
  }