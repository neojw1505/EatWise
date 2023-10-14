<template>
  <div>
    <Navbar />
    <div
      class="p-5 pt-2 shadow border rounded-4 my-3 mx-auto"
      style="max-width: 1600px"
    >
      <!-- name and picture -->
      <div class="m-2 d-flex justify-content-between align-items-center">
        <div>
          <h1>{{ selectedRecipe.name }}</h1>
        </div>
        <div :class="isSaved ? savedClass : unsavedClass" @click="save">
          Saved<img style="width: 25px" :src="savedLogo" alt="" />
        </div>
      </div>
      <div class="row">
        <!-- left side -->
        <div class="col-8 justify-content-center">
          <div
            class="col-6 mx-auto p-1 shadow rounded-5"
            style="background-color: #4f919f"
          >
            <img
              class="img-fluid rounded-5"
              :src="selectedRecipe.recipeImage"
            />
          </div>
          <!-- prep and serving size -->
          <div class="text-center py-2 fw-bold">
            <span class="mx-2">
              <font-awesome-icon :icon="['fas', 'user-group']" />
              Prep: {{ selectedRecipe.preparationTime }} Mins
            </span>
            <span class="mx-2">
              <font-awesome-icon :icon="['fas', 'clock']" />
              Serving Size: {{ selectedRecipe.servingSize }}
            </span>
          </div>
          <!-- give description -->
          <div class="my-2">
            <div
              class="btn rounded-4 text-body-secondary my-1"
              style="background-color: #4f919f"
            >
              Description:
            </div>
            <div class="mx-4">{{ selectedRecipe.description }}</div>
          </div>

          <!-- give inggredients -->
          <div>
            <div
              class="btn rounded-4 text-body-secondary my-1"
              style="background-color: #4f919f"
            >
              Ingredients:
            </div>
            <div class="mx-4" v-for="i in selectedRecipe.ingredients" :key="i">
              {{ i }}
            </div>
          </div>
          <!-- give step -->
          <div>
            <div
              class="btn rounded-4 text-body-secondary my-1"
              style="background-color: #4f919f"
            >
              Preparation Steps:
            </div>
            <div
              class="mx-4 my-2"
              v-for="(step,index) in selectedRecipe.preparationSteps"
              :key="step"
            >
              <b>Step {{ index+1 }}:</b> {{ step }}
            </div>
          </div>
        </div>

        <!-- right side -->
        <div class="col-4">
        <div class="my-2">
            <div
              class="btn rounded-4 text-body-secondary my-1"
              style="background-color: #4f919f"
            >
              Nutritional Info:
            </div>
            <table class="mx-2 my-2 table table-bordered table-striped ">
                <tr v-for="(num, fact) in selectedRecipe.nutritionalInfo" :key="fact">
                    <td>{{ fact }}</td>
                    <td class="text-end">{{ num }}</td>
                </tr>
            </table>
          </div>
      </div>

      </div>
      
    </div>
  </div>
</template>

<script>
import image from "../../Navbar/images/saved.png";
import healthyImage from "../FindRecipesPage/card/healthymeal.jpeg";
export default {
  data() {
    return {
      savedLogo: image,
      unsavedClass: "rounded-4 border align-items-center bg-light p-1",
      savedClass: "rounded-4 border align-items-center bg-success p-1",
      isSaved: false,

      selectedRecipe: {
        name: "Burrito",
        dietType: ["DietType1", "DietType2", "DietType3"],
        recipeImage: healthyImage,
        preparationTime: 15,
        servingSize: 2,
        ingredients: [
          "Lettuce: 1.5",
          "Tomato: 2",
          "Potato: 3",
          "Jun Wei: 100000000",
          "Conola Oil: 2 tablespoon",
        ],
        preparationSteps: [
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        ],
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        nutritionalInfo: {
          Calories: "123cal",
          Carbohydrate: "123kcal",
          Fat: "16.8g",
          Iron: "22.7%",
          Fat: "16.8g",
          Fat: "16.8g",
          Fat: "16.8g",
          Fat: "16.8g",
          Fat: "16.8g",
          Fat: "16.8g",
          Fat: "16.8g",
          Fat: "16.8g",
          Fat: "16.8g",
          Fat: "16.8g",
        },
      },
    };
  },
  methods: {
    save() {
      this.isSaved = !this.isSaved;
    },
  },
};
</script>

<style></style>
