<template>
  <div>
    <Navbar />
    <div class="mx-auto">
      <h2 class="m-3">Market Place</h2>
      <div class="mx-3 container row mx-auto" style="max-width: 1200px">
        <!-- left side -->
        <div class="col-md-12 col-lg-4 mb-5">
            <MarketFilter @getInput="handleInput"/>
        </div>
        <!-- right side -->
        <div class=" col-lg-8 col-md-12">
          <!-- sort by -->
          <h5 class="fw-bold ">Sort By:</h5>
          <div>
            <div class="d-flex  flex-wrap">
              <MarketSortBy
                v-for="(bool,option) in sortOptions"
                :key="option"
                :eachOption="option"
                :bool="bool"
                @isCheck="handdleCheckoption"
              />
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
      dataResult: null
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
      this.marketSearchQuery=data[0];
      this.minPrice=data[1];
      this.maxPrice=data[2];
      if(data[3]!=''){
        this.supermarket=data[3].map(market=>(market.split(' ').join('')));
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

<style></style>
