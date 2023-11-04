<template>
  <div class="overall">
    <Navbar />
    <div class="mx-auto" >
      <div class="header">
        <!-- Add background Image -->
        <div class="img">
          <h2 class="m-0 text-white fw-bold d-flex " style="padding-top:200px; padding-left:40px; font-size:60px">Market Place</h2>
        </div>
      </div>
      <!-- catchy headline -->
      <h1 class="my-3 text-center" style=" font-family: Georgia, 'Times New Roman', Times;">
      Find the  <span style="color: #7a8cea; font-weight: bold"> cheapest </span> ingredients available!
      </h1>
      <!-- input to search for ingredient -->
      <div class="mx-3 mb-5 d-flex mx-auto col-6 align-items-center ">
        <input v-model="marketSearchQuery" class="form-control border-3 rounded-5" placeholder="What are you looking for?"/>
        <div @click="fetchProducts" class="btnStyle btn my-1 ms-2 rounded-4" style="background-color: #7A8CEA;" >
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="lg" />
        </div>
      </div>
      <!-- main body -->
      <div class="mx-3 container row mx-auto" style="max-width: 1200px">
        <!-- left side -->

        <div class="col-md-12 col-sm-12 col-lg-4 mb-5" v-if="showFilter">
            <MarketFilter @getInput="handleInput"/>
        </div>
        <!-- right side -->
        <div class="col">
          <!-- sort by -->
          <h5 class="fw-bold text-black fs-3 mt-2">Sort By:</h5>
          <div>
            <div class="d-flex flex-wrap mx-auto">
              <MarketSortBy
                v-for="(bool,option) in sortOptions"
                :key="option"
                :eachOption="option"
                :bool="bool"
                @isCheck="handdleCheckoption"
              />
              <button class=" btnStyle btn btn-dark rounded-4" @click="toggleFilter">
                Apply Filter <font-awesome-icon :icon="['fas', 'filter']" /> 
            </button>
            </div>
          </div>

          <MarketResult :result="dataResult"/>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      marketSearchQuery:"",
      minPrice:0,
      maxPrice: Number.POSITIVE_INFINITY,
      onPromotion: false,
      isAscending:false,
      sortOptions: {"On Promotion":false,"Order By Price(Ascending)":false},
      supermarket:['FairPrice','ColdStorage','ShengShiong'],
      sortBy:[],
      dataResult: null,
      showFilter:false
    }
  },
  methods:{
    handdleCheckoption(data){
        if(data[1]==true && !this.sortBy.includes(data[0])){
            this.sortOptions[data[0]]=data[1]
            this.sortBy.push(data[0])
        }
        else if(data[1]==false && this.sortBy.includes(data[0])){
            this.sortOptions[data[0]]=data[1]
            let index=this.sortBy.indexOf(data[0]);
            this.sortBy.splice(index,1);
        }
        // console.log(this.sortBy);
    },
    handleInput(data){
      this.dataResult=null
      console.log(data)
      // this.marketSearchQuery=data[0];
      this.minPrice=data[0];
      this.maxPrice=data[1];
      if(data[2]!=''){
        this.supermarket=data[2].map(market=>(market.split(' ').join('')));
        console.log(this.supermarket)
      }
      this.fetchProducts();
      
    },  
    async fetchProducts(){
      //searchQuery = '', minPrice = 0, maxPrice = Number.POSITIVE_INFINITY, onPromotion = false, ascending = true, supermarketName = ''
      if(this.minPrice==""){
        this.minPrice=0;
      }
      if(this.maxPrice==""){
        this.maxPrice=Number.POSITIVE_INFINITY;
      }
      //account for query from selected recipe
      let tempquery = this.$store.getters.getIngredientquery;
      if(tempquery!=""){
        this.marketSearchQuery=tempquery;
      }
      if(this.marketSearchQuery==null){
        this.marketSearchQuery=""
      }
      //account for view more promotion from home page

      if(this.$store.getters.getviewPromo){
        this.sortBy.push("On Promotion");
        this.sortOptions["On Promotion"]=true;
        this.$store.dispatch('setviewPromo', false);
      }

      this.onPromotion= this.sortBy.includes("On Promotion") ? true : false
      this.isAscending= this.sortBy.includes("Order By Price(Ascending)") ? true : false
      this.dataResult= await this.$smAPI.fetchProducts(this.marketSearchQuery, this.minPrice, this.maxPrice, this.onPromotion, this.isAscending, this.supermarket);
      this.$store.dispatch('setIngredientquery', "");
    },
    toggleFilter(){
      this.showFilter =! this.showFilter;
    }
  },
  created() {
    this.fetchProducts();
  },
  watch:{
    sortBy: {
      deep: true,
      handler(newVal, oldVal) {
        this.dataResult=null
        this.fetchProducts();
      },
    },
  }
};
</script>

<style scoped>
.img{
  background-image: url(../homepageAsset/marketplacebackground.jpeg);
  width: 100%;
  height: 25vh;
  object-fit: fill;
  background-size: 100%;
  background-repeat: no-repeat;
}

.btnStyle{
  transition: transform 0.3s;
}
.btnStyle:hover {
  transform: scale(1.05); /* Scale up by 10% on hover */
  cursor: pointer;
}
</style>
