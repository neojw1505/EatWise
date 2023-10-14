<template>

  <div class="card col-lg-4 col-md-4 col-sm-12" v-if="recipeData && nutritionData">
    <div class="card-header"><h3>Breakfast</h3></div>

    <!-- Display the image or a spinner -->
  <div class="image-container" v-if="loading">
    <div class="spinner-border text-success" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="image-container" v-else>
    <div class="image-wrapper">
      <img class="card-img" :src="recipeData.image" @load="onImageLoad" />
      <div class="bookmark" >
        <button class="bookmark-button" @click="toggleBookmarkState()">
          <font-awesome-icon v-if="isBookmarked" :icon="['fas', 'bookmark']" size="2xl" style="color: #007459;" />
          <font-awesome-icon v-else :icon="['fas', 'bookmark']" size="2xl" style="color: #ffffff;" />
        </button>
      </div>

    </div>
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


      <button class="btn btn-fail" @click="toggleConsumedState()" :class="{ 'consumed-btn-green': isConsumed }" style="margin-left: 1rem;">
        {{ isConsumed ? 'Eaten' : 'Not Eaten' }}        
        <font-awesome-icon v-if="isConsumed" :icon="['fas', 'check']" style="color: #ffffff;" size="lg" />
        <font-awesome-icon v-else :icon="['fas', 'xmark']" style="color: #ffffff;" size="lg" />
      </button>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mealType: "lunch",
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

      this.isConsumed = false;
      this.isBookmarked = false;

    },
    onImageLoad() {
      // This method is called when the image has finished loading
      this.imageLoaded = true; // Set imageLoaded to true once the image is loaded
      this.loading = false; // Set loading to false after the image is loaded
    },

    async toggleConsumedState() {
    this.isConsumed = !this.isConsumed;
    },

    async toggleBookmarkState() {
    this.isBookmarked = !this.isBookmarked;
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

  background-color: #FFB18D;
  color: #000000;
  border-radius: 2rem;
  box-shadow: 5px 5px 10px #888888;

}
.image-container {
  height: 300px; /* Adjust the height as needed */
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative; /* Add this to position the bookmark icon */
}
.card-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Ensures the image fully covers the container */
  border-radius: 0.5rem;
  box-shadow: 5px 5px 10px #888888;
}
.card .badge {
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 0.5rem;
  color: #000000;
  background-color: #FBE8A6;
  margin-left: 5px; /* Add margin between labels */
  
}
.card-footer {
  text-align: center;
  
}
.btn {
  background-color: #303C6C;
  color: #fff;
  box-shadow: 5px 5px 10px #888888;
}
.btn:hover {
  background-color: #fff;
  color: #303C6C;
}
.btn-fail {
  background-color: #D7191C;
  color: #fff;
}
.btn-fail:hover {
  background-color: #fff;
  color: #D7191C;
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
  box-shadow: 5px 5px 10px #888888;

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
  top: 2rem;
  right: 1.5rem;
  box-shadow: 5px 5px 10px #888888;
}

.bookmark-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

}
</style>
