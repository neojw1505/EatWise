<!-- This component generate a random recipe -->
<template>
  <div>
    <button @click="getRandomRecipe">Click to get random recipe</button>
    <div v-if="RandomRecipe" :style="{display: 'flex'}">
        <div >
            <h1>Title: {{ Title }}</h1>
            <h2>DishTypes: {{ DishTypes }} </h2>
            <h2 v-if="Diets">Diets: {{ Diets }} </h2>
            <h2>Prep Time: {{ PrepTime }}</h2>
            <div>Cooking Steps: 
                <ul v-if="CookingSteps">
                    <div v-for="instructions in CookingSteps" :key="instructions">
                        <li v-for="(step,index) in instructions.steps" :key="step">
                            <span>Step {{index + 1}}: {{ step.step }}</span> <br>
                            <ul v-if="step.ingredients.length != 0">
                                <span :style="{'text-decoration': 'underline','font-weight': 'bold'}">Ingredients needed for this Step:</span> 
                                <li v-for="ingredient in step.ingredients" :key='ingredient'>{{ ingredient.name }}</li>
                            </ul>
                            <ul v-if="step.equipment.length != 0">
                                <span :style="{'text-decoration': 'underline','font-weight': 'bold'}">Equipments needed for this Step:</span> 
                                <li v-for="equipment in step.equipment" :key='equipment'>{{ equipment.name }}</li>
                            </ul>
                        </li>
                    </div>
                </ul>
            </div>
            <h3>Summary:</h3>
            <p v-html="Summary"></p>
        </div>
        <div >
            <img :src="imgUrl">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      RandomRecipe: null,
      Title: '',
      DishTypes: [],
      Diets: [],
      PrepTime: '',
      imgUrl: '',
      CookingSteps: [],
      Summary: '',
    };
  },
  methods: {
    async getRandomRecipe() {
      let RandomRecipeObj = await this.$spoonAPI.getRandomRecipe(); 
      this.RandomRecipe = RandomRecipeObj.recipes[0]
      this.Title = this.RandomRecipe.title;
      this.DishTypes = this.RandomRecipe.dishTypes;
      this.Diets = this.RandomRecipe.diets;
      this.PrepTime = this.RandomRecipe.readyInMinutes;
      this.imgUrl = this.RandomRecipe.image;
      this.CookingSteps = this.RandomRecipe.analyzedInstructions;
      this.Summary = this.RandomRecipe.instructions;
      console.log(this.RandomRecipe);
    },
  },
};
</script>

<style></style>
