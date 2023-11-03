<template>
  <div class="card shadowborder-dark mx-auto" style="overflow: auto; width: 335px "  v-if="recipeData && nutritionData">
    <div class="card-header"><h3>Breakfast</h3></div> 

    <!-- Display the image or a spinner -->
  <div class="card align-items-center" v-if="loading">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="card shadow text-center" v-else>
    <div class="image-wrapper d-flex align-items-center justify-content-center">
      <img class="card-img" :src="recipeData.image" @load="onImageLoad"/>
      <div class="bookmark" >
        <button class="bookmark-button" @click="toggleBookmarkState()">
          <font-awesome-icon  v-if="isBookmarked" :icon="['fas', 'bookmark']" size="2xl" style="color: #007459;" />
          <font-awesome-icon  v-else :icon="['fas', 'bookmark']" size="2xl" style="color: #ffffff;" />
        </button>
      </div>
    </div>
  </div>
    <div class="card shadow" v-else>
      <div class="image-wrapper" @click="seeRecipeDetailsInMealPlan">
        <img class="card-img" :src="recipeData.image" @load="onImageLoad" />
        <div class="bookmark">
          <button
            class="bookmark-button"
            @click.stop="
              toggleBookmarkState(recipeData.id, recipeData, nutritionData)
            "
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
    </div>

    <div class="card-body border-0" v-if="!loading && imageLoaded">
      <h5 class="card-title overflow-hidden" style="height: 60px;">{{ formattedRecipeName }}</h5>
      <p class="card-text">
        <span> Servings: {{ recipeData.servings }} </span>
        <span> Carbs: {{ nutritionData.carbs }} </span>
        <span> Fat: {{ nutritionData.fat }} </span>
        <span> Protein: {{ nutritionData.protein }} </span>
      </p>
      <!-- Labels based on conditions -->
      <div style="height: 60px">
        <div class="d-flex justify-content-end flex-wrap">
          <span
            v-for="label in labels"
            :key="label"
            class="badge d-sm-inline-block m-1"
            >{{ label }}</span
          >
        </div>
      </div>
      <!-- Top Right Label for Kcal and PrepTime -->
      <div class="badge badge-circular">
        <div class="badge-content">
          <font-awesome-icon :icon="['fas', 'fire-flame-curved']" />
          {{ nutritionData.calories }}kcal<br />
          <font-awesome-icon :icon="['fas', 'clock']" />
          {{ recipeData.readyInMinutes }}min
        </div>
      </div>
    </div>

    <div class="card-footer border-0">
      <!-- Only display the "Get New" button when the food is not consumed -->
      <button class="btn me-2" @click="refreshRecipe(mealType)" v-if="!isConsumed">
        Get New <font-awesome-icon :icon="['fas', 'arrows-rotate']" />
      </button>

      <button class="btn btn-lg rounded-4 btn-fail " @click="toggleConsumedState()" :class="{ 'consumed-btn-green': isConsumed }">
        {{ isConsumed ? 'Eaten' : 'Not Eaten' }}        
        <font-awesome-icon v-if="isConsumed" :icon="['fas', 'check']" style="color: #ffffff;" size="lg" />
        <font-awesome-icon v-else :icon="['fas', 'xmark']" style="color: #ffffff;" size="lg" />
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      mealType: "breakfast",
      loading: false, // Initialize as not loading
      imageLoaded: false, // Initialize as not loaded

      isConsumed: false,
      isBookmarked: false,
    };
  },
  props: {
    recipeData: {
      type: Object,
      required: true,
    },
    nutritionData: {
      type: Object,
      required: true,
    },
  },
  async created() {
    this.isBookmarked = await this.$smAPI.isRecipeAlreadyBookmarked(
      this.recipeData.id
    );
    this.isConsumed = await this.$smAPI.isMealAlreadySetForDate(
      "breakfast",
      this.currentDate
    );
  },
  computed: {
    labels() {
      const labels = [];
      if (this.recipeData.vegetarian) {
        labels.push("Vegetarian");
      }
      if (this.recipeData.vegan) {
        labels.push("Vegan");
      }
      if (this.recipeData.glutenFree) {
        labels.push("Gluten Free");
      }
      if (this.recipeData.dairyFree) {
        labels.push("Dairy Free");
      }
      if (this.recipeData.veryHealthy) {
        labels.push("Healthier Choice");
      }
      // Add more labels based on your conditions
      return labels;
    },
    formattedRecipeName() {
      return this.recipeData.title.length > 42
        ? this.recipeData.title.slice(0, 41) + "..."
        : this.recipeData.title;
    },
    formattedRecipeSummary() {
      return this.recipeData.summary.replace(/<a[^>]*>(.*?)<\/a>/g, '<a style="color:blue; font-weight:bold;">$1</a>');
    },
    currentDate() {
      let date = new Date();
      // Extracting date components
      let year = date.getFullYear();
      let month = date.getMonth() + 1; // Month is zero-based, so add 1
      let day = date.getDate();
      let formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    },
    currentTime() {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let formattedTime = `${hours}:${minutes}:${seconds}`;
      return formattedTime;
    },
  },
  methods: {
    async refreshRecipe(mealType) {
      this.loading = true; // Set loading to true when refreshing
      this.$emit("refresh-recipe", mealType);

      this.isConsumed = false;
      this.isBookmarked = false;
    },
    onImageLoad() {
      // This method is called when the image has finished loading
      this.imageLoaded = true; // Set imageLoaded to true once the image is loaded
      this.loading = false; // Set loading to false after the image is loaded
    },

    async toggleConsumedState(date) {
      if (this.isConsumed) {
        this.isConsumed = !this.isConsumed;
        this.$smAPI.RemoveBreakfastConsumptionHistory(date);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: `You did not eat <b style='color: red;'>${this.recipeData.title}</b> for Breakfast!`,
        });
      } else {
        this.isConsumed = !this.isConsumed;
        this.SetEatenBreakfastinFB();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: `You ate <b style='color: green'>${this.recipeData.title}</b> for Breakfast!`,
        });
      }
    },

    async toggleBookmarkState(recipeId, newSavedRecipe, nutritionData) {
      if (this.isBookmarked) {
        // if already saved in firebase, remove it because user uncheck bookmark
        this.isBookmarked = !this.isBookmarked;
        this.$smAPI.removeSavedRecipeInFB(recipeId);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          background: "green",
          color: "white",
          title: `Removed <b style='color:gold'>${this.recipeData.title}</b> from Saved Recipes!`,
        });
      } else {
        // if not in firebase, add it into firebase because user click button to bookmark
        this.isBookmarked = !this.isBookmarked;
        this.$smAPI.addSavedRecipesInFB(
          recipeId,
          newSavedRecipe,
          nutritionData
        );
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          background: "green",
          color: "white",
          title: `Added <b style='color:gold'>${this.recipeData.title}</b> to Saved Recipes!`,
        });
      }
    },
    async SetEatenBreakfastinFB() {
      await this.$smAPI.SetEatenBreakfastinFB(
        this.recipeData,
        this.nutritionData,
        this.currentDate,
        this.currentTime
      );
    },
    seeRecipeDetailsInMealPlan() {
      console.log(this.recipeData);
      Swal.fire({
        title: this.recipeData.title,
        html: this.formattedRecipeSummary,
        imageUrl: this.recipeData.image,
        imageWidth: 400,
        imageHeight: 300,
      });
    },
  },
  async RemoveBreakfastConsumptionHistory(date) {
    // YYYY-MM-DD
    await this.$smAPI.RemoveBreakfastConsumptionHistory(date);
  },
  watch: {
    // Watch for changes in recipeData and reset imageLoaded and loading
    recipeData() {
      this.imageLoaded = false;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
svg.fa-bookmark {
  stroke: black;
  stroke-width: 30;
}
.card {
  border-radius: 20px;
  border: 1px solid #FFF;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.62) 71.87%, rgba(0, 0, 0, 0.00) 100%);
  color:white;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-img {
  max-width: 500px;
  max-height: 200px;
  object-fit: fit; /* Ensures the image fully covers the container */
}
.card .badge {
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 10px;
  color: #000000;
  background-color: #7A8CEA;
  margin-left: 5px;
}
.card-footer {
  text-align: center;
}
.btn {
  background-color: #303c6c;
  color: #fff;
}
.btn:hover {
  background-color: #fff;
  color: #303c6c;
}
.btn-fail {
  background-color: #d7191c;
  color: #fff;
}
.btn-fail:hover {
  background-color: #fff;
  color: #d7191c;
}
.consumed-btn-green {
  background-color: #007459;
  color: #fff;
}
.consumed-btn-green:hover {
  color: #007459;
  background-color: white;
}
.spinner-border {
  width: 10rem;
  height: 10rem;
  color: #303c6c;
}
.badge-circular {
  min-width: 70px;
  padding: 0.2em 0.5em;
  background-color: #cc6600;
  color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 20px;
  animation: pulsate 2s infinite;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.badge-content {
  text-align: center;
  font-size: larger;
}

@keyframes pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* New styles for the bookmark icon */
.bookmark {
  position: absolute;
  top: 15px;
  right: 15px;
  box-shadow: 5px 5px 10px #888888;
}

.bookmark-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>
