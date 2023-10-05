<template>
  <nav
    class="navbar navbar-expand-lg navbar-light sticky-top"
    style="background-color: #007459"
  >
    <div class="container-fluid">
      <div class="d-flex">
        <!-- eatwise logo and dropdown button -->
        <NavbarHamburger />
        <NavbarLogo />
      </div>

      <div
        class="collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent"
      >
        <!-- show the left logos -->
        <NavbarLink1 />
        <NavbarLink2 />
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style></style>
