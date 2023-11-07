<template>
  <div class="pageStyle">
    <Navbar />
    <div class="mx-2">
      <div
        v-if="recipeDetails"
        class="contentStyle mx-auto"
        style="max-width: 1200px"
      >
        <!-- name and picture -->
        <div class="m-2 d-flex justify-content-end align-items-center">
          <!-- <button @click="setBreakfastFromSavedRecipes">Set as Breakfast</button>
        <button @click="setLunchFromSavedRecipes">Set as Lunch</button>
        <button @click="setDinnerFromSavedRecipes">Set as Dinner</button> -->
          <div class="d-flex">
            <!-- drop down to show meal -->
            <select
              class="form-select mx-2"
              v-model="meal"
              @change="setMealType"
            >
              <option value="Add to meal" selected>Add to meal</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>

            <button
              class="bookmark-button mx-2"
              @click="toggleBookmarkState(recipeDetails.id, recipeDetails)"
            >
              <font-awesome-icon
                v-if="isBookmarked"
                :icon="['fas', 'bookmark']"
                size="2xl"
                style="color: #ffff00"
              />
              <font-awesome-icon
                v-else
                :icon="['fas', 'bookmark']"
                size="2xl"
                style="color: #ffffff"
              />
            </button>
          </div>
        </div>
        <div class="row">
          <!-- left side -->
          <div class="col-lg-6 justify-content-center">
            <div class="cardStyle p-2 rounded-4">
              <div class="col-lg-10 col-sm-8 col-md-6 mx-auto p-1 rounded-5">
                <img 
                  class="img-fluid rounded-5 border"
                  :src="recipeDetails.image"
                  @click="seeRecipeDetails"
                />
              </div>
            </div>

            <!-- give description -->
            <!-- <div class="cardStyle p-2 rounded-4">
            <div>
              <span class="fw-semibold">Description:</span>
            </div>
            <div class="removeA mx-4" v-html="formattedRecipeSummary"></div>
          </div> -->

            <!-- give ingredients -->
            <div class="cardStyle p-2 rounded-4">
              <div class="d-flex justify-content-between">
                <span class="fw-semibold">Ingredients:</span>
                <span class="fw-semibold"
                  >*Click ingredient to view in market</span
                >
              </div>
              <div
                class="mx-4"
                v-for="i in recipeDetails.extendedIngredients"
                :key="i"
                @click="searchInMarket(i.name)"
                style="cursor: pointer"
              >
                <li>{{ i.name }}</li>
              </div>
            </div>
          </div>

          <!-- right side -->
          <div class="col-lg-6">
            <!-- name of recipe and small description -->
            <div class="cardStyle p-4 rounded-4">
              <h1 class="text-white">{{ recipeDetails.title }}</h1>
              <!-- prep and serving size -->
              <div
                class="text-center py-2 fw-bold d-flex flex-wrap justify-content-center"
              >
                <div class="mx-2">
                  <font-awesome-icon :icon="['fas', 'clock']" />
                  Preparation and Cooking Time:
                  {{ recipeDetails.readyInMinutes }} Mins
                </div>
                <div class="mx-2">
                  <font-awesome-icon :icon="['fas', 'user-group']" />
                  Serving Size: {{ recipeDetails.servings }}
                </div>
              </div>
            </div>
            <div class="cardStyle p-4 rounded-4">
              <div class="fw-semibold mb-3">Diet Type:</div>
              <div>
                <span
                  class="bg-light text-black p-2 mx-2 rounded-2 border border-warning"
                  v-for="diet in recipeDetails.diets"
                  :key="diet"
                  >{{ diet }}</span
                >
              </div>
            </div>
            <!-- give step -->
            <div
              class="cardStyle p-2 rounded-4"
              v-if="recipeDetails.instructions"
            >
              <div>
                <span class="fw-semibold">Preparation Steps:</span>
              </div>
              <div
                class="mx-4 my-3 d-flex align-items-center"
                v-for="(step, index) in recipeDetails.analyzedInstructions[0]
                  .steps"
                :key="step"
              >
                <div class="mx-2">
                  <div
                    class="text-black bg-light justify-content-center align-items-center d-flex"
                    style="
                      width: 30px;
                      height: 30px;
                      padding: 5px;
                      border-radius: 50%;
                    "
                  >
                    {{ index + 1 }}
                  </div>
                </div>

                <div class="mt-2">{{ step.step }}</div>
              </div>
            </div>
            <div class="cardStyle p-4 rounded-4">
              <div>
                <span class="fw-semibold">Nutritional Info:</span>
              </div>
              <table class="mx-2 my-2 table table-bordered table-striped">
                <tr
                  v-for="(fact, num) in recipeDetails.nutrition.nutrients"
                  :key="num"
                >
                  <td>{{ fact.name }}</td>
                  <td class="text-end">{{ fact.amount }} {{ fact.unit }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mx-auto text-center">Error 404: no recipe found</div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "SelectedRecipeCard",
  data() {
    return {
      recipeDetails: null,
      isBookmarked: false,
      meal: "Add to meal",
      initialMealType: null,
    };
  },
  computed: {
    formattedRecipeSummary() {
      let temp = this.recipeDetails.summary
        .replace(/<a[^>]*>(.*?)<\/a>/g, '<a  font-weight:bold;">$1</a>')
        .split(".");
      let res = [];
      for (let eachLine of temp) {
        if (!eachLine.includes("$") && !eachLine.includes("{")) {
          res.push(eachLine);
        } else if (eachLine.includes("{")) {
          let tempsentence = "";
          for (let char of eachLine) {
            if (addInChar && char != "{") {
              tempsentence += char;
            } else if (char == "{") {
              addInChar = false;
            } else if (char == "}") {
              addInChar = true;
            }
          }
          res.push(tempsentence);
        }
      }
      return res.join(". ");
    },
  },
  methods: {
    save() {
      this.isSaved = !this.isSaved;
    },
    async getRecipeDetails() {
      const mealTypeRef = {
        breakfast: "Breakfast",
        lunch: "Lunch",
        dinner: "Dinner",
      };
      // this.recipeDetails = this.$store.getters.getSharedData;
      // console.log(this.recipeDetails);
      const storedData = localStorage.getItem("selectedRecipe");
      this.recipeDetails = storedData ? JSON.parse(storedData) : null;

      let getMealType = await this.$smAPI.getMealPlanCategory(
        this.recipeDetails.id
      );
      if (getMealType) {
        this.meal = mealTypeRef[getMealType];
        this.initialMealType = mealTypeRef[getMealType];
      }
      console.log(this.recipeDetails);
    },
    async toggleBookmarkState() {
      console.log(this.isBookmarked);
      if (this.isBookmarked) {
        // if already saved in firebase, remove it because user uncheck bookmark
        this.isBookmarked = !this.isBookmarked;
        this.$smAPI.removeSavedRecipeInFB(this.recipeDetails.id);
      } else {
        // if not in firebase, add it into firebase because user click button to bookmark
        this.isBookmarked = !this.isBookmarked;
        console.log(this.recipeDetails.nutrition);
        this.$smAPI.addSavedRecipesInFB(
          this.recipeDetails.id,
          this.recipeDetails,
          this.recipeDetails.nutrition
        );
      }
    },
    searchInMarket(item) {
      this.$store.dispatch("setIngredientquery", item);
      this.$router.push({ path: "/market" }); // Navigate to the receiver component
    },
    async setBreakfastFromSavedRecipes() {
      await this.$smAPI.setBreakfastFromSavedRecipes(
        this.recipeDetails,
        this.recipeDetails.nutrition
      );
    },
    async setLunchFromSavedRecipes() {
      await this.$smAPI.setLunchFromSavedRecipes(
        this.recipeDetails,
        this.recipeDetails.nutrition
      );
    },
    async setDinnerFromSavedRecipes() {
      await this.$smAPI.setDinnerFromSavedRecipes(
        this.recipeDetails,
        this.recipeDetails.nutrition
      );
    },
    async setMealType() {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${year}-${month}-${day}`;
      let checkConsumption = await this.$smAPI.GetConsumptionHistoryForDate(
        currentDate
      );
      let error = "";
      console.log(checkConsumption);

      console.log(this.meal);

      if (this.meal == "Breakfast") {
        if (!checkConsumption || !("breakfast" in checkConsumption)) {
          this.setBreakfastFromSavedRecipes();
          Swal.fire({
            icon: "success",
            title: "Breakfast successfully set",
            text: "Recipe has been set for breakfast!",
          });
        } else {
          error += "Please uncheck Breakfast in Meal Planner and Try Again";
        }
      } else if (this.meal == "Lunch") {
        if (!checkConsumption || !("lunch" in checkConsumption)) {
          this.setLunchFromSavedRecipes();
          Swal.fire({
            icon: "success",
            title: "Lunch successfully set",
            text: "Recipe has been set for dinner!",
          });
        } else {
          error += "Please uncheck Lunch in Meal Planner and Try Again";
        }
      } else if (this.meal == "Dinner") {
        if (!checkConsumption || !("dinner" in checkConsumption)) {
          this.setDinnerFromSavedRecipes();
          Swal.fire({
            icon: "success",
            title: "Dinner successfully set",
            text: "Recipe has been set for dinner!",
          });
        } else {
          error += "Please uncheck Dinner in Meal Planner and Try Again";
        }
      } else {
        if (this.initialMealType == "Breakfast") {
          if (!checkConsumption || !("breakfast" in checkConsumption)) {
            await this.$smAPI.setBreakfastRecipeInFB();
            Swal.fire({
              icon: "success",
              title: "Meal Regenerated",
              text: "Recipe removed from breakfast and has been regenerated",
            });
          } else {
            error += "Please uncheck Breakfast in Meal Planner and Try Again";
          }
        } else if (this.initialMealType == "Lunch") {
          if (!checkConsumption || !("lunch" in checkConsumption)) {
            await this.$smAPI.setLunchRecipeInFB();
            Swal.fire({
              icon: "success",
              title: "Meal Regenerated",
              text: "Recipe removed from lunch and has been regenerated",
            });
          } else {
            error += "Please uncheck Lunch in Meal Planner and Try Again";
          }
        } else if (this.initialMealType == "Dinner") {
          if (!checkConsumption || !("dinner" in checkConsumption)) {
            await this.$smAPI.setDinnerRecipeInFB();
            Swal.fire({
              icon: "success",
              title: "Meal Regenerated",
              text: "Recipe removed from dinner and has been regenerated",
            });
          } else {
            error += "Please uncheck Dinner in Meal Planner and Try Again";
          }
        }
      }

      if (error != "") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }

      this.initialMealType = this.meal;
    },
    seeRecipeDetails() {
      console.log(this.recipeDetails);
      Swal.fire({
        title: this.recipeDetails.title,
        html: this.formattedRecipeSummary,
        imageUrl: this.recipeDetails.image,
        imageWidth: 400,
        imageHeight: 300,
      });
    },
  },
  async created() {
    await this.getRecipeDetails();
    this.isBookmarked = await this.$smAPI.isRecipeAlreadyBookmarked(
      this.recipeDetails.id
    );
  },
};
</script>

<style scoped>
.cardStyle {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.5)
  );
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
}

.bookmark-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.contentStyle {
  padding-top: 100px;
  margin-left: 50px;
  margin-right: 50px;
}

.pageStyle {
  background-image: url("../../homepageAsset/selectedRecipe.jpg");
  background-size: cover;
  padding-bottom: 100px;
}
</style>
