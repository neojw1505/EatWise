<template>
  <li class="nav-item">
    <div class="nav-item">
      <form class="d-flex bg-light rounded-5">
        <input
          class="form-control me-2 rounded-5"
          type="search"
          placeholder="Search recipes"
        />
        <button
          class="btn btn-outline-success border-0 rounded-5"
          type="submit"
        >
          <img class="logo" src="../images/search_logo2.jpg" alt="" type="button" />
        </button>
      </form>
    </div>
  </li>
</template>

<script>
export default {};
</script>

<style scoped>
.logo{
    width: 25px;
    height: 25px;
}
</style>
