<template>
  <div class="pageStyle" >
    <Navbar />
    <div class="mx-2">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
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
              <div
                class="col-lg-10 col-sm-8 col-md-6 mx-auto p-1 rounded-5 text-center"
              >
                *click image to show description
                <img
                  class="img-fluid rounded-5 border"
                  :src="recipeDetails.image"
                  @click="seeRecipeDetails"
                />
              </div>
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

            <!-- give title and diet type -->
            <div class="cardStyle p-4 rounded-4" v-if="!isLargeScreen">
              <h1 class="text-white fw-bold">{{ recipeDetails.title }}</h1>
              <div class="d-inline-block pt-2 d-flex flex-wrap">
                <div
                  v-for="(diet, index) in recipeDetails.diets"
                  :key="index"
                  class="p-2 me-2 rounded-4 text-wrap my-1"
                  style="
                    background-color: #7a8cea;
                    color: white;
                    white-space: nowrap;
                  "
                >
                  {{ diet }}
                </div>
              </div>
            </div>
            <!-- give ingredients -->
            <div class="cardStyle p-2 rounded-4">
              <div class="d-flex justify-content-between mb-2">
                <span class="fw-semibold">Ingredients:</span>
                <span class="fw-semibold"
                  >*Click ingredient to view in market</span
                >
              </div>
              <div class="mx-4">
                <table class="my-2 table table-hover table-bordered table-striped" > 
                  <tr
                    v-for="i in recipeDetails.extendedIngredients"
                    :key="i"
                    @click="searchInMarket(i.name)"
                    style="cursor: pointer"
                    class="btnStyle"
                  >
                    <td class="btnStyle">{{ i.name }}</td>
                    <td class="text-end">
                      {{ i.measures.metric.amount }}
                      {{ i.measures.metric.unitShort }}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- right side -->
          <div class="col-lg-6">
            <!-- name of recipe and small description -->
            <div class="cardStyle p-4 rounded-4" v-if="isLargeScreen">
              <h1 class="text-white fw-bold">{{ recipeDetails.title }}</h1>
              <div class="d-inline-block pt-2 d-flex flex-wrap">
                <div
                  v-for="(diet, index) in recipeDetails.diets"
                  :key="index"
                  class="p-2 me-2 rounded-4 text-wrap my-1"
                  style="
                    background-color: #7a8cea;
                    color: white;
                    white-space: nowrap;
                  "
                >
                  {{ diet }}
                </div>
              </div>
            </div>
            <!-- give brief nutrients -->
            <div class="cardStyle p-4 rounded-4" @click="seeDetailedNutrition">
              <div class="fw-semibold mb-3">
                Nutrition <font-awesome-icon :icon="['fas', 'info-circle']" />
              </div>
              <div class="d-flex flex-wrap text-center">
                <div
                  v-for="nutrient of showEssentialNutrients"
                  :key="nutrient"
                  class="rounded-4 p-1 m-1"
                  style="background-color: #fbe8a6; width: 100px"
                >
                  <div class="text-dark bg-light rounded-5 p-2">
                    {{ nutrient.amount.toFixed(0) }}{{ nutrient.unit }}
                  </div>
                  <div class="text-dark">{{ nutrient.name }}</div>
                </div>
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
                class="mx-4 my-3 d-flex align-items-start"
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

                <div class="">{{ step.step }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mx-auto text-center">Error 404: no recipe found</div>
    </div>
  </div>
    <Footer />
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
      isLargeScreen: window.innerWidth > 992,
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
    showEssentialNutrients() {
      let nutrients = ["Fat", "Carbohydrates", "Protein", "Calories", "Fiber"];
      let allNutrients = this.recipeDetails.nutrition.nutrients;
      let essentialNutrients = [];
      for (let eachNutrient of allNutrients) {
        if (nutrients.includes(eachNutrient.name)) {
          if (eachNutrient.name == "Carbohydrates") {
            essentialNutrients.push({
              name: "Carbs",
              amount: eachNutrient.amount,
              unit: eachNutrient.unit,
              percentOfDailyNeeds: eachNutrient.percentOfDailyNeeds,
            });
            continue;
          }
          essentialNutrients.push(eachNutrient);
        }
      }
      return essentialNutrients;
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
    displayNutritionTable() {
      const table = document.createElement("table");
      table.className = "table table-bordered table-striped";
      this.recipeDetails.nutrition.nutrients.forEach((fact, num) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        cell1.innerHTML = fact.name;
        const cell2 = row.insertCell(1);
        cell2.className = "text-end";
        cell2.innerHTML = `${fact.amount} ${fact.unit}`;
      });
      return table;
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
    seeDetailedNutrition() {
      Swal.fire({
        icon: "info",
        title: "Nutrition Table",
        html: this.displayNutritionTable(),
        grow: "column",
        scrollbarPadding: false,
        padding: "50px",
      });
    },
    checkScreenSize() {
      this.isLargeScreen = window.innerWidth > 992;
    },
  },
  async created() {
    await this.getRecipeDetails();
    this.isBookmarked = await this.$smAPI.isRecipeAlreadyBookmarked(
      this.recipeDetails.id
    );
    window.addEventListener("resize", this.checkScreenSize);
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  destroyed() {
    window.removeEventListener("resize", this.checkScreenSize);
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
}

.btnStyle{
  transition: transform 0.3s;
}
.btnStyle:hover {
  transform: scale(1.05); /* Scale up by 10% on hover */
  cursor: pointer;
}
</style>
