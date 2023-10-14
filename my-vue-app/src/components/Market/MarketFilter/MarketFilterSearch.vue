<template>
  <div>
    <div class="d-flex align-items-center" >
      <font-awesome-icon
        :icon="['fas', 'magnifying-glass']"
        class="searchLogo border p-2"
      />
      <input v-model="addItemToFilter" class="form-control d-inline px-0" />
      <span class="btn border rounded-3 mx-2 px-2 border-2" type="button" @click="addMarketItem">
        +
      </span
      >
    </div>
    <div
      class="m-3 d-flex justify-content-start"
      style="max-width: 400px; flex-wrap: wrap"
    >
      <div
        v-for="i in MarketSearchList"
        :key="i"
        class="rounded-5 border bg-dark-subtle p-2 px-2 align-items-center mx-1"
        :value="i"
      >
        {{ i
        }}<span
          class="fw-bolder border rounded-5 bg-light  px-2 pb-1 align-items-center"
          @click="removeMarketItem(i)"
          >x</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
      MarketSearchList: [],
      addItemToFilter: "",
    };
  },
  methods: {
    addMarketItem() {
      if (this.addItemToFilter == "") {
        return;
      }
      this.MarketSearchList.push(this.addItemToFilter);
      this.addItemToFilter = "";
    //   console.log(this.MarketSearchList)
    },
    removeMarketItem(i) {
      let index = this.MarketSearchList.indexOf(i);
      this.MarketSearchList.splice(index, 1);
    //   console.log(this.MarketSearchList)

    },
  },
};
</script>

<style scope>
.searchLogo {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-right: 0px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>
