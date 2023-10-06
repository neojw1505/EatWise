<template>
    <div>
        <div class = "header">
        <h1>Your Meal Plans</h1>
        <button @click="generateMealPlan()">Re-use Meal Plan</button>
        <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Date
            </button>

            <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
        data() {
            return {
            name: 'John',
            phone: '123456'
        }
				},
				methods: { 
            getPhone() { 
              // method doesn't necessarily 'return'
				return "This is my number " + this.phone; 
            }
				}
    }
</script>
