<template>
  <nav
  class="navbarStyle navbar navbar-expand-md navbar-light mx-auto text-center border shadow px-3 py-1 align-items-center d-flex"
    style="background-color: #ffff"
  >
    <div class="container-fluid">
        <!-- eatwise logo and dropdown button -->
      <div class="d-flex" @click="goAbout">
        <div class="text-center mx-2">
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
export default {
  methods:{
    goAbout(){
      this.$router.push({path:'/about'});
    }
  }
};
</script>

<style scoped>
.logo {
  width: 25px;
  height: 25px;
}

.navbarStyle {
  z-index: 1;
  border-radius: 40px;
  position: fixed;
  width:95%;
  margin:10px auto;
  left: 0;
  right: 0;
  top: 0;
}

</style>
