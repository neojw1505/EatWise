<template>
    <div>
    <NavbarLandingPage></NavbarLandingPage>
    <div class="card col-8 mx-auto mt-5">
      <div class="card-body mx-auto col-sm-12 text-center">
        <div class="card-title mx-auto">
          <h2>Congratulations!</h2>
        </div>
        <div class="card-text mx-auto">
          <p>Your custom plan is ready and you're one step closer to healthy eating.</p>
          <h3>Your net kilojoule goal is:</h3>
        </div>
        <div class="text-group mx-auto">
            <div class="d-flex justify-content-between align-items-center mx-auto">
            <h1 class="col-6">{{ value }}</h1> 
            <button class="btn btn-primary mx-auto col-6" @click="convertToCalories()">{{ default_state ?'Kilojoules':'Calories'}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto text-center">
      <button
        id="previous"
        class="btn my-5 mx-2 px-5 bg-warning fw-semibold"
        type="submit"
        v-on:click="goPrevious()"
      >
        Previous
      </button>
      <button
        id="next"
        class="btn my-5 mx-2 px-5 bg-warning fw-semibold"
        type="submit"
        v-on:click="goNext()"
      >
        Next
      </button>
    </div>
</div>
  </template>
  

<script>
export default{
    data(){
        return{
            value:19999,
            default_state:true
        }
    },
    methods:{
        convertToCalories(){
            if(this.default_state) {
                this.value = this.value*239;
                this.default_state=false;
            }else{
                this.value = this.value/239;
                this.default_state=true;
            }
        }
    }
}
</script>



<style scoped>



#card{
    width:80%;
    height:auto;

}

#text-group{
    display:inline-block;
}
p{
    margin-top:20px;
}
h3{
    margin-bottom:40px;

}

#card-title{
    width:80%;
    height:auto;
    font-size: 4vw;
}
.card-body {
    display: inline-block;
    justify-content: center;
    background-color: #F9F7F7 ;
    border-radius: 40px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.50);
    top: 150px;
    height: 100%;
    width:80%;
    padding-top:5%;
    margin:5%;
}

.btn{
    background-color: #f38e5f;
    color: white;
    border-radius: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    max-width:50%;
    border-style: none;
}

.btn:hover {
    background-color: #ee6221;
    transition: 0.7s;
    color:white
}


</style>