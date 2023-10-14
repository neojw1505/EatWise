<template>
  <div class="card border-success col-lg-4 col-md-4 col-sm-12" v-if="recipeData && nutritionData">
    <div class="card-header"><h3>Dinner</h3></div>

    <!-- Display the image or a spinner -->
    <div class="image-container" v-if="loading">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="image-container" v-else>
      <img class="card-img" :src="recipeData.image" @load="onImageLoad" />
    </div>

    <div class="card-body" v-if="!loading && imageLoaded">
      <h4 class="card-title">{{ recipeData.title }}</h4>
      <p class="card-text">
        <span> Servings: {{ recipeData.servings }} </span>
        <span> Carbs: {{ nutritionData.carbs }} </span>
        <span> Fat: {{ nutritionData.fat }} </span>
        <span> Protein: {{ nutritionData.protein }} </span>
      </p>
      <!-- Labels based on conditions -->
      <div class="d-flex justify-content-end flex-wrap">
        <span
          v-for="label in labels"
          :key="label"
          class="badge d-sm-inline-block"
          >{{ label }}</span
        >
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

    <div class="card-footer">
      <button class="btn" @click="refreshRecipe(mealType)">
        Get New <font-awesome-icon :icon="['fas', 'arrows-rotate']" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mealType: "dinner",
      loading: false, // Initialize as not loading
      imageLoaded: false, // Initialize as not loaded
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
        labels.push("GlutenFree");
      }
      if (this.recipeData.dairyFree) {
        labels.push("DairyFree");
      }
      if (this.recipeData.veryHealthy) {
        labels.push("veryHealthy");
      }
      // Add more labels based on your conditions
      return labels;
    },
  },
  methods: {
    async refreshRecipe(mealType) {
      this.loading = true; // Set loading to true when refreshing
      this.$emit("refresh-recipe", mealType);
    },
    onImageLoad() {
      // This method is called when the image has finished loading
      this.imageLoaded = true; // Set imageLoaded to true once the image is loaded
      this.loading = false; // Set loading to false after the image is loaded
    },
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
.card {
  background-color: #aed4b7;
  color: #fff;
  border-radius: 2rem;
}
.image-container {
  height: 300px; /* Adjust the height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover; /* Ensures the image covers the container */
}
.card .badge {
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 0.5rem;
  color: #fff;
  background-color: #cc6600;
  margin-left: 5px; /* Add margin between labels */
}
.card-footer {
  text-align: center;
}
.btn {
  background-color: #007459;
  color: #fff;
}
.btn:hover {
  background-color: #fff;
  color: #007459;
}
.spinner-border {
  width: 10rem; 
  height: 10rem;
}
.badge-circular {
  min-width: 70px; /* Set a minimum width for the badge */
  padding: 0.2em 0.5em; /* Adjust the padding as needed */
  background-color: #cc6600;
  color: #fff;
  border-radius: 50%; /* Make the badge circular */
  position: absolute;
  top: 10px; /* Adjust the top position as needed */
  right: 20px; /* Adjust the right position as needed */
  animation: pulsate 2s infinite; /* Add pulsating animation */
  display: inline-flex; /* Make the badge adjust its size based on content */
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
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
</style>
