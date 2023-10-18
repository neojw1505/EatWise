<template>
    <div id="container" class="mx-auto d-block">
        <div>
            <NavbarLandingPage />
        </div>
        <div id="background-container">
            <img id="background-image" src="../img/background.png" alt="background">
        </div>
        <div class="title col-sm-6 col-lg-4 col-xs-6">
            Select Your Gender
        </div>
        <div class="body col-sm-6 col-lg-6 col-xs-6 mx-auto">
            <div class="row">
            <div class="maleContainer col-3" value="male">
                <img src="../img/male.png">
                <h3 style="margin-top: 5px;">Male</h3>
            </div>

            <div class="femaleContainer col-3" value="female">
                <img src="../img/female.png"> 
                <h3 style="margin-top: 5px;">Female</h3>
            </div>
        </div>
        </div>
        <button id="submit" class="btn col-sm-6 col-xs-6 btn-lg text-center my-5 " type="submit">Next</button>
    </div>
</template>

<script>
export default{

methods:

function submit(){
    
}


}

</script>



<style scoped>
#container {
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
}

#background-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;

}

#background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.title {
    display: flex;
    position: relative;
    border-radius: 15px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    background-color: #EAD048;
    text-align: center;
    font-family: Poppins;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 46.8px */
    letter-spacing: 7.2px;
    text-transform: uppercase;
    margin-left: auto;
    margin-right: auto;
    top: 100px;
    padding: 10px;

}

.body {
    display: flex;
    position: relative;
    justify-content: center;
    background-color: #F9F7F7 ;
    border-radius: 40px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.50);
    top: 150px;
    height: 40vh;
    width: 50vw;
}

.maleContainer {
    position: absolute;
    top: 15%;
    left: 20%;
    border: 2px solid black;
    border-radius: 10px;
    padding: 50px;
    text-align: center ;
    background-color:#F9F7F7;
    overflow: hidden;

}

.femaleContainer {
    position: absolute;
    top: 15%;
    right: 20%;
    border: 2px solid black;
    border-radius: 10px;
    padding: 50px;
    text-align: center ;
    background-color:#F9F7F7;
    overflow: hidden;
  
}

.btn{
    position: absolute;
    background-color: #f38e5f;
    color: white;
    top: 65%;
    left: 25%;
    border-radius: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
}

.btn:hover {
      background-color: #ee6221;
      transition: 0.7s;
      color:white
  }

</style>