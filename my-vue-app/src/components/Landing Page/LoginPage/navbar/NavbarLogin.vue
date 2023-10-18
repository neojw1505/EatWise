<template>
  <nav class="navbar navbar-expand-lg navbar-light sticky-top" style="background-color: #F4976C;">
    <div class="container-fluid">
      <div class="row w-100">
        <div class="col-sm-6">
          <!-- Logo -->
          <div class="d-flex">
            <NavbarLogo />
          </div>
        </div>
        <div class="col-sm-6">
          <!-- Login&Regi -->
          <div class="d-flex justify-content-end">
            <Login&Regi />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
};
</script>

<style>
.navbar{
  width:100%;
}

</style>

