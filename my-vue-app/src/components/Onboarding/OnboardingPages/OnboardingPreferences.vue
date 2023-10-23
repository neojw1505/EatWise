<template>
  <div>
      <div class="header mx-auto text-center mt-10">
        <h2>WHAT KIND OF RECIPES DO YOU WANT?</h2>
      </div>
      <div class="card mx-auto">
                      <div class="card-body mx-auto">
                          <div class="input-group">
                            <div class="form-check col-6">
                                  <input class="form-check-input" type="checkbox" value="Quick" id="Quick">
                                  <label class="form-check-label" for="Quick">
                                    <h3>Quick</h3>
                                    <p>Recipe preparation less than 10 minutes</p>
                                  </label>
                                </div>
                                <div class="form-check col-6">
                                  <input class="form-check-input" type="checkbox" value="Affordable" id="Affordable" >
                                  <label class="form-check-label" for="Affordable">
                                    <h3>Affordable</h3>
                                    <p>Recipes costing less than $10</p>
                                  </label>
                                </div>
                          </div>
                        <div class="input-group">
                            <div class="form-check col-6">
                              <input class="form-check-input" type="checkbox" value="Simple" id="Simple">
                              <label class="form-check-label" for="Simple">
                                <h3>Simple</h3>
                                <p>Recipes with less than 5 ingredients</p>
                              </label>
                            </div>
                            <div class="form-check col-6">
                              <input class="form-check-input" type="checkbox" value="FamilyFriendly" id="FamilyFriendly" >
                              <label class="form-check-label" for="FamilyFriendly">
                                <h3>Family-Friendly</h3>
                                <p>Varied meals, ideal for families</p>
                                </label>
                            </div>
                        </div>

                      </div>
                  </div>
    <div class="mx-auto text-center">
      <button
        id="previous"
        class="btn my-5 mx-2 px-5 bg-warning fw-semibold"
        type="submit"
        v-on:click="goPrevious()"
      >
        Previous
      </button>
      <button
        id="next"
        class="btn my-5 mx-2 px-5 bg-warning fw-semibold"
        type="submit"
        v-on:click="goNext()"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activityLevel: null,
    };
  },
  methods: {
    goPrevious() {},

    goNext() {
      console.log("values : ", this.activityLevel);
    },
  }, // methods
};
</script>

<style scoped>

#form-check{
  display:block;
}
.header{
  width:80%;
  height: 1204px;
  z-index: 1;
}
.card{
  width:80%;
  height:80%;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.50);
  min-width: 600px;
  max-width: 600px;
  margin:auto;
  padding-left:30px;
  padding-right:30px;

}
.card-body{
  display:flexbox;
  align-items: center;
  justify-content: space-around;
  min-width: 500px;
  overflow-x: auto;
}
</style>
