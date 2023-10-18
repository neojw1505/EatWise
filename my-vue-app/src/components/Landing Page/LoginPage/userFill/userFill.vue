<template> 

  <div id="logincard" class="card d-block"> 
      <div class="card-body d-block"> 
          <h5 class="card-title mb-4 text-center ">Member Login</h5> 
              <input class="col-sm-12" type="text" id="email" placeholder="Email Address">
              <input class="password-group col-sm-12 pb-12" type="password" id="password" placeholder="Password">
                <!-- <div class="password-group-append img-overlay">
                  <button class="btn" id="unhide"><img src="../../Assets/hide.png"></button>
                </div> -->
            <a href="" class="card-link col-sm-12" id="forgot-password">Forgot Password?</a>
            <div class="form-group">
            <button id="login" style="margin-bottom:20px;min-width:300px" class="btn btn-warning col-sm-12 col-xs-12 btn-lg text-center p-2" type="submit"> Login</button>
            </div>
            <div class="form-group d-inline" style="margin-bottom:20px;margin-top: 20px;;">
            <p class="text-center">Not a member yet? <a href ="#" >Sign up now!</a></p>
            </div>
            <div class="form-group">
            
              <p> <hr> </p>
              
            </div>
            
            <div class="form-group text-center" style="min-width:300px">
            <button style="font-size:auto;" id="google-signin" class="btn btn-primary col-4 btn-sm mx-auto" type="submit">Sign in with Google</button>
            </div>
      </div> 
  </div> 
  
</template>

<script>
export default {
  name:'userFill'
};
</script>

<style scoped>
p{
  color:grey
}
#email{
  color: #9A8F8F;
  margin-top:10px;
  padding:10px;
}
#password{
  color: #9A8F8F;
  margin-top:10px;
  padding:10px;

}
#forgot-password{
  font-size: 12px;
  scale:auto ;
}
#login{
  margin:auto;
  margin-top:20px;
}
#google-signin{
  margin:auto;
  margin-top:20px;
}
.card-body{
  margin:auto;
  padding-top: 100px;
  padding-bottom:100px;
  align-items: center;
  justify-items: center;

}
#logincard{
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  max-width: 1000px;
  margin: 0 auto; /* Center the card horizontally */
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.50);
  border-radius: 40px;

}
input{
  width: 100%;
}
</style>
