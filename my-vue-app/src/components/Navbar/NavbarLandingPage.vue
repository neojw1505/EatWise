<template>
  <nav
    class="navbar navbar-expand-lg navbar-light sticky-top"
    style="background-color: #EF8A5B"
  >
    <div class="container-fluid">
        <!-- eatwise logo and dropdown button -->
      <div class="d-flex">
        <div class="text-center mx-2">
        <img
            class="logo"
            src="./images/companyLogo.png"
            alt=""
        />
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

<style>
.logo {
  width: 25px;
  height: 25px;
}

</style>
