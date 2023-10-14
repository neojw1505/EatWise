<template>
  <div>
    <Navbar />
    <div class="mx-auto">
      <h2 class="m-3">Market Place</h2>
      <div class="mx-3 container row mx-auto" style="max-width: 1700px">
        <!-- left side -->
        <div class="col-md-12 col-lg-4 mb-5">
            <MarketFilter/>
        </div>
        <!-- right side -->
        <div class=" col-lg-8 col-md-12">
          <!-- sort by -->
          <h5 class="fw-bold ">Sort By:</h5>
          <div>
            <div class="d-flex  flex-wrap">
              <MarketSortBy
                v-for="option in sortOptions"
                :key="option"
                :eachOption="option"
                @isCheck="handdleCheckoption"
              />
            </div>
          </div>
          <MarketResult/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      sortOptions: ["Most Relevant","Most Recent","On Promotion","Order By Price(Ascending)"],
      sortBy:[],
    }
  },
  methods:{
    handdleCheckoption(data){
        if(data[1]==true && !this.sortBy.includes(data[0])){
            this.sortBy.push(data[0])
        }
        else if(data[1]==false && this.sortBy.includes(data[0])){
            let index=this.sortBy.indexOf(data[0]);
            this.sortBy.splice(index,1);
        }
        // console.log(this.sortBy);
    }
  }
};
</script>

<style></style>
