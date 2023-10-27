<template>
  <div>
    <Navbar/>
    <ProfileTop :userName="ProfileName"/>
    <hr class="border border-dark border-1 opacity-100 mx-3 mx-auto" style="max-width: 1200px;">
    <ProfileBottom/>
  </div>
</template>

<script>
import { auth } from '../../firebaseService';
import Navbar from '../Navbar/Navbar.vue'
export default {
  components: { Navbar },
  data(){return{
    ProfileName: auth.currentUser.displayName,
  }}

}
</script>

<style>

</style>