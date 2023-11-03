<template>
  <div class="btn-group-toggle" data-toggle="buttons">
    <label class="btn btn-light border rounded-4 mr-1" style="margin-right: 5px;">
      <input class="d-inline"  type="checkbox" :value="eachOption" @click="checkIt" :checked="bool" /> {{eachOption}}
    </label>
  </div>
</template>

<script>
export default {
    props:["eachOption","bool"],
    data(){return{
      checked:this.bool
    }
    },
    methods:{
      checkIt(){
        // console.log(this.checked)
        this.checked=!this.checked;
        this.$emit('isCheck',[this.eachOption,this.checked])
      }
    }
};
</script>

<style></style>
