<template>
  <div class="bg-dark text-white mt-5">
    <div class="row p-4">
        <!-- icon plus description -->
        <div class=" px-5 col-md-12 col-lg-6">
            <div class="fs-3">
                <font-awesome-icon :icon="['fas', 'egg']" size="2xl" />
                EatWise
            </div>
            Our solution is a user-friendly web app that offers personalized meal
            recommendations, compares ingredient prices in 3 supermarkets, and
            automates progress tracking for health goals. Our one-stop solution
            simplifies healthy eating, budgeting, and tracking, making it easier for
            individuals to improve their food choices and overall well-being.
        </div>

    <!-- route to different page -->
        <div class="col my-3 ">
            <div class="text-center text-underline"> <u>Pages</u> </div>
            <div class="d-flex justify-content-center">
                <div class="mx-5">
                    <div v-for="(route,name) in pages1" :key="name" @click="this.$router.push({ path: route });" class="btnStyle my-2">{{ name }}</div>
                </div>
                <div class="mx-5">
                    <div v-for="(route,name) in pages2" :key="name" @click="this.$router.push({ path: route });" class="btnStyle my-2">{{ name }}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-center">
        © 2023 EatWise.com. All rights reserved
    </div>
    
  </div>
</template>

<script>
export default {
    data(){return{
        pages1:{
            'Home':'/',
            'Find Recipes':'/find-recipes',
            'Market':'/market',
        },
        pages2:{
            'Insights':'/insights',
            'Saved Recipes':'/saved-recipes',
            'Profile':'/profile'
        }
    }
    }
};
</script>

<style scoped>
.btnStyle{
  transition: transform 0.3s;
}
.btnStyle:hover {
  transform: scale(1.05); /* Scale up by 10% on hover */
  cursor: pointer;
}
</style>
