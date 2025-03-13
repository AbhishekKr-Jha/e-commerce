
<script> 
import apiHelper from '../../utils/apiHelper'
import Loader from "../../components/Loader.vue";


export default{
name:'ProductList',
data(){
    return{
productListing:[],
isLoader:false
    }
},
components:{
Loader
},
methods:{
    async getAllProducts(){
        this.isLoader=true
        const response=await apiHelper.get('products')
        this.isLoader=false
        console.log("the response is",response)
        if(response.status){
            this.productListing=response.result
            this.$toast.success("Products fetched successfully")
        }else{
            this.$toast.error(response.result)   
        }
        
    }
},
created(){
    this.getAllProducts()
}
}

</script>


<template>
<div class="w-full flex flex-col items-center  pt-20 h-min">

    <h2 class="text-center">All Products</h2>
    <div v-show="isLoader" class="m-auto">
    <Loader  />
</div>


<div class="w-full flex flex-wrap justify-center items-center gap-20">
    <div v-for="ele in productListing" :key="ele.id" class="product-card bg-green">
        <div class="product-image overflow-hidden rounded-lg bg-red relative text-white">
            <img :src="ele.image" class="pointer">
            <span class="absolute top-5 right-15">({{ ele.rating.count }} reviews)</span>
                 <span class="absolute top-25 right-15 ">⭐ {{ ele.rating.rate }}</span>
        </div>
        <div @click="$router.push(`/products/${ele.id}`)" class="">
            <div class="product-title mt-10">{{ ele.title }}</div>
            <div class="product-price">${{ ele.price }}</div>
            <div class="product-description">
               {{ele.description.slice(0,40)}}
            </div>
            <div class="product-category">Category: {{ ele.category }}</div>
            <!-- <div class="product-rating">
                ⭐ {{ ele.rating.rate }} <span class="rating-count">({{ ele.rating.count }} reviews)</span>
            </div> -->
            <button class="buy-button m-auto mt-20">Buy Now</button>
        </div>
    </div>
</div>



</div>
</template>

<style scoped>

.product-card {
    width: 300px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: 0.3s;
padding: 15px;
}

/* .product-card:hover {
    transform: translateY(-5px);
} */

.product-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: all ease-in 0.5s;
}

.product-image img:hover{
    transform: scale(1.1);
}

.product-info {
    /* padding: 15px; */
}

.product-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
}

.product-price {
    font-size: 18px;
    color: #2d89ef;
    font-weight: bold;
}

.product-description {
    font-size: 12px;
    color: #666;
    margin: 8px 0;
    line-height: 1.4;
}

.product-category {
    font-size: 12px;
    color: #888;
    font-style: italic;
}

.product-rating {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 8px;
    font-size: 14px;
}

.rating-count {
    font-size: 12px;
    color: #777;
}

.buy-button {
    display: block;
    width: 100%;
    text-align: center;
    padding: 10px;
    background: #2d89ef;
    color: white;
    font-size: 14px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: 0.3s;
}

.buy-button:hover {
    background: #1c5fb8;
}

</style>