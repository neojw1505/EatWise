<template>
  <div class="border border-1 mx-2 rounded-3 my-1" style="width: 200px;">
    <img class="img-fluid mx-auto d-flex m-2" :src="memberInput.picture" alt="" style="border-radius: 50%; width: 100px; height: 100px;">
    <div class="fs-5 fw-bold text-center">{{ name }}</div>
    <div class="text-center">"<span class="mx-2">{{ memberInput.comment }}</span>"</div>
  </div>
</template>

<script>
export default {
    props:['name','memberInput']
}
</script>

<style>

</style>