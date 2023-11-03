<template>
  <div class="row mx-3 container mx-auto pt-3" style="max-width: 1200px;">
    <ProfileUser :userName="userName"  />
    <ProfileCaloriesTracker/>
  </div>
</template>

<script>

export default {
    props: ["userName"],
}
</script>

<style scoped>
</style>