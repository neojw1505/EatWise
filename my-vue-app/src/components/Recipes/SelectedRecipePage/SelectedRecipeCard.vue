<template>
  <div>
    <Navbar />
    <div class="p-5 pt-2 rounded-4 my-3 mx-auto" style="max-width: 1200px">
      <!-- name and picture -->
      <div class="m-2 d-flex justify-content-between align-items-center">
        <div>
          <h1>{{ recipeDetails.title }}</h1>
        </div>
        <button
          class="bookmark-button"
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
      <div class="row">
        <!-- left side -->
        <div class="col-lg-6 justify-content-center">
          <div class="cardStyle p-2 rounded-4">
            <div class="col-lg-10 col-sm-8 col-md-6 mx-auto p-1 rounded-5">
              <img
                class="img-fluid rounded-5 border"
                :src="recipeDetails.image"
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

          <!-- give description -->
          <div class="cardStyle p-2 rounded-4 my-1">
            <div>
              <span class="fw-semibold">Description:</span>
            </div>
            <div class="removeA mx-4" v-html="computedDescription"></div>
          </div>

          <!-- give ingredients -->
          <div class="cardStyle p-2 rounded-4 my-1">
            <div>
              <span class="fw-semibold">Ingredients:</span>
            </div>
            <div
              class="mx-4"
              v-for="i in recipeDetails.extendedIngredients"
              :key="i"
            >
              <li>{{ i.name }}</li>
            </div>
          </div>
        </div>

        <!-- right side -->
        <div class="col-lg-6">
          <div class="cardStyle p-4 py-2 rounded-4">
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
      <!-- give step -->
      <div class="cardStyle p-2 rounded-4">
        <div>
          <span class="fw-semibold">Preparation Steps:</span>
        </div>
        <div
          class="mx-4 my-2"
          v-for="(step, index) in this.recipeDetails.analyzedInstructions[0]
            .steps"
          :key="step"
        >
          <b>Step {{ index + 1 }}:</b> {{ step.step }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectedRecipeCard",
  data() {
    return {
      recipeDetails: null,
      isBookmarked: false,
    };
  },
  computed: {
    computedDescription() {
      let temp = this.recipeDetails.summary.split(".");
      let res = [];
      let addInChar = true;
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
    getRecipeDetails() {
      this.recipeDetails = this.$store.getters.getSharedData;
      console.log(this.recipeDetails);
    },
    async toggleBookmarkState() {
      console.log(this.isBookmarked);
      if (this.isBookmarked) {
        // if already saved in firebase, remove it because user uncheck bookmark
        this.isBookmarked = !this.isBookmarked;
        this.$smAPI.removeSavedRecipeInFB(recipeId);
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
  },
  async created() {
    await this.getRecipeDetails();
    this.isBookmarked = await this.$smAPI.isRecipeAlreadyBookmarked(
      this.recipeDetails.id
    );
  },
};
</script>

<style scope>
.cardStyle {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.3)
  );
  color: white;
}

.bookmark-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
.removeA a {
  text-decoration: none;
  color: white;
  cursor: text;
  pointer-events: none;
}
</style>
