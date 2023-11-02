<template>
  <div class="bg row mx-3 container mx-auto pb-4" style="max-width: 1200px;">
    <ProfileUser :userName="userName" />
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