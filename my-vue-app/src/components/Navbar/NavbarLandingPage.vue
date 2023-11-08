<template>
  <nav
    class="navbar navbar-expand-lg navbar-light mx-auto rounded-5"
    style="background-color: #7A8CEA"
  >
    <div class="container-fluid">
        <!-- eatwise logo and dropdown button -->
      <div class="d-flex">
        <div class="text-center mx-2">
        <!-- <img
            class="logo"
            src="./images/companyLogo.png"
            alt=""
        /> -->
        <font-awesome-icon :icon="['fas', 'egg']" size="xl"/>

        <div class="fw-semibold">EatWise</div>
        </div>
      </div>
      <!-- show the register and login -->
      <NavbarLinkLandingPage />
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.logo {
  width: 25px;
  height: 25px;
}
.navbar{
border-radius: 40px;
width:95%;
margin-top:10px;
}
</style>
