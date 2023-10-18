
<template> 

  <div id="logincard" class="card d-block"> 
      <div class="card-body d-block"> 
        <form>
          <div class="row col-sm-12 mx-auto">
          <h5 class="card-title mb-4 text-center ">User Registration</h5> 
            <input class="col-sm-12" type="text" id="name" placeholder="Full Name">
              <input class="col-sm-12" type="text" id="email" placeholder="Email Address">
              <input class="password-group col-sm-12 pb-12" type="password" id="password" placeholder="Password">

              <!-- Date -->
              <!-- <div class="row" id="DOB">
              <input class="col-sm-10" type="text" id="DOB" placeholder="Date of Birth: DD/MM/YYYY">
              <button class="btn col-sm-2" id="calenderbutton"><img src='./assets/image 148.png' id="calendericon"></button>
              </div> -->
              <!-- Chat GPT -->
              <!-- <div class="input-group">
                <input type="text" class="form-control" v-model="selectedDate" id="datePicker" data-provide="datepicker">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fa fa-calendar"></i></span>
              </div>
              </div> -->
          </div>
              <form class="row" id="DOB">
                <div class="col-12">
                  <div class="input-group date col-10" style="width=100%" id="datepicker">
                    <input type="text" class="form-control" style="width:100%" id="date" placeholder="Date of Birth: DD/MM/YYYY"/>
                    <span class="input-group-append">
                      <span class="input-group-text bg-light d-block">
                        <i class="fa fa-calendar"><img src='./assets/image 148.png' id="calendericon"></i>
                      </span>
                    </span>
                  </div>
                </div>
              </form>

              <!--  -->
            <div class="form-group">
            <button id="register" style="margin-bottom:20px;min-width:300px" class="btn btn-warning col-sm-12 col-xs-12 btn-lg text-center p-2" type="submit">Register</button>
            </div>
          
            <!-- <div class="form-group d-inline" style="margin-bottom:20px;margin-top: 20px;;">
            <p class="text-center">Not a member yet? <a href ="#" >Sign up now!</a></p>
            </div>
            <div class="form-group text-center" style="min-width:300px">
            <button style="font-size:auto;" id="google-signin" class="btn btn-primary col-4 btn-sm mx-auto" type="submit">Sign in with Google</button>
            </div> -->
          </form>

      </div> 
  </div> 
  
</template>

<script>
export default {
  name:'RegistrationFill',

  mounted() {
    // Initialize the Bootstrap Datepicker when the component is mounted
    $(this.$refs.datepicker).datepicker();
  }
};
function datepicker(){
    $('#datepicker').datepicker();
}
</script>

<style scoped>
.row{
  margin-top:10px;
}
p{
  color:grey
}
#name{
  color: #9A8F8F;
  margin-top:10px;
  padding:10px;
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
#calendericon{
  width:20px;
  height:20px;
  position: relative;
  display:flex;
  align-items: center;
  justify-content: center;

}
#calenderbutton{
  text-align: center;
width:  40px;
height: 40px;
display:flex;
  align-items: center;
  justify-content: center;
}
#DOB{
  color: #9A8F8F;
  margin-top:10px;
  padding:10px;
  position:flex;
  
}
#register{
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
  /* max-height: 60vh;  */
  /* Set a maximum height based on viewport height */
  
  /* overflow-y: auto;  */
  /* Add a scrollbar if the content overflows */
  padding: 10px;

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
.input-group-append {
  cursor: pointer;
}
#date{
  margin-top:10px;
  padding:10px;
  border-radius: 0px;
  border:1px solid #9A8F8F;
  color:#9A8F8F;
} 
</style>
