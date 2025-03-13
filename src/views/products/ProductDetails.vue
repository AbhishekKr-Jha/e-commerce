
<script> 
// import { watch } from "vue";
import { useRoute } from "vue-router";
import apiHelper from '../../utils/apiHelper'
import Loader from "../../components/Loader.vue";
import Policy from "../../components/Policy.vue";


export default{
    name:'ProductDetails',
    // props: ["id"],
data(){
    return {
isLoader:false,
product:{},
extraProducts:[],
itemInCart:false,
itemInWatchList:false
    }
},
    components:{
        Loader,
        Policy
    },
    methods:{
        async getProductDetails(id){
        this.isLoader=true
        const response=await apiHelper.get(`products/${id}`)
        this.isLoader=false
        console.log("the response is",response)
        if(response.status){
            this.product=response.result
            this.$toast.success("Products fetched successfully")
            this.getAllProducts(id)
            this.isItemInCart(id)
            this.isItemInWatchList(id)

        }else{
            this.$toast.error(response.result)   
        }
        
    },
    async getAllProducts(id){
        const response=await apiHelper.get('products')
        console.log("the response is",response)
        if(response.status){
            let data=response.result
            let filterData=data.filter(item=> item.category==this.product.category && item.id!==Number(id))
            this.extraProducts=filterData
        }else{

        }
        
    },
    toggleToCartFunc(productId){
        console.log("the i id",this.route.params.id)
const getCartData=JSON.parse(localStorage.getItem('cartList')) || []
const productIndex = getCartData.findIndex(item => item.id === Number(this.route.params.id))
    if (productIndex !== -1) {
        getCartData.splice(productIndex, 1)
        this.itemInCart=false
    } else {
        getCartData.push(this.product)
        this.itemInCart=true
    }
    localStorage.setItem('cartList', JSON.stringify(getCartData))


    },

async addToCart(){
    this.isLoader=true
    const response=await apiHelper.post('carts',{
        id:0,
        userId:0,
        products:[this.product]
    })
    this.isLoader=false
   if(response.status){
    this.itemInCart=true
    this.$toast.success("Item successfully added to cart")
    const getCartData=JSON.parse(localStorage.getItem('cartList')) || []
    getCartData.push(this.product)
    localStorage.setItem('cartList', JSON.stringify(getCartData))
   }else{
    this.$toast.error(response.result || "Something went wrong") 
   }
},


async removeFromCart(){
    this.isLoader=true
    const response=await apiHelper.delete(`carts/${this.product.id}`)
   console.log("the response of delete cart data is",response)
   this.isLoader=false
   if(response.status){
    this.itemInCart=false
    this.$toast.success("Item successfully removed from cart")
    const getCartData=JSON.parse(localStorage.getItem('cartList')) || []
const productIndex = getCartData.findIndex(item => item.id === Number(this.route.params.id))
getCartData.splice(productIndex, 1)
localStorage.setItem('cartList', JSON.stringify(getCartData)) 
}else{
    this.$toast.error(response.result || "Something went wrong") 
}
},



    isItemInCart(productId){
        let getCartData = JSON.parse(localStorage.getItem('cartList')) || []
        this.itemInCart= getCartData.some(item => item.id === Number(productId))
    },
    fetchNewProduct(id){
        this.getProductDetails(id)
    },
    toggleWatchListFunc(){
        console.log("the i id",this.route.params.id)
const getWatchListData=JSON.parse(localStorage.getItem('watchList')) || []
const productIndex = getWatchListData.findIndex(item => item.id === Number(this.route.params.id))
    if (productIndex !== -1) {
        this.$toast.success("Item successfully removed from watchlist")
        getWatchListData.splice(productIndex, 1)
        this.itemInWatchList=false
    } else {
        this.$toast.success("Item successfully added to watchlist")
        getWatchListData.push(this.product)
        this.itemInWatchList=true
    }
    localStorage.setItem('watchList', JSON.stringify(getWatchListData))
 
    },
    isItemInWatchList(productId){
        let getWatchList = JSON.parse(localStorage.getItem('watchList')) || []
        this.itemInWatchList= getWatchList.some(item => item.id === Number(productId))
    },
    },
    created(){
        console.log("dom")
        this.route = useRoute();
console.log("the id value is---->", this.route.params.id)
this.getProductDetails(this.route.params.id)
// this.getAllProducts()
},
// watch: {
//        "$route"(to, from) {
//         console.log("Route changed:", to.params.id);
//         this.fetchNewProduct(to.params.id); // Fetch new product details
//     }
    // }
}
</script>

<template> 
<div  class="container w-full flex flex-col items-center  pt-20 h-min">

<!-- <h2 class="text-center">All Products</h2> -->
<div v-show="isLoader" class="m-auto">
<Loader  />
</div>

<div v-show="!isLoader" class="w-full flex flex-col">

    <div style="gap:40px;" class=" w-full flex flex-wrap">
        
    <div style="" class="product-img relative ">
      <img :src="product.image" :alt="product.title" width="100%"  />
      <i @click="toggleWatchListFunc" style="font-size: 35px;color:red;z-index: 100;" :class="!itemInWatchList ?'ri-heart-3-line':'ri-heart-3-fill' " class="absolute top-10 right-15 pointer"></i>
    </div>

    <div style="gap: 10px;flex: 1;"  class="w-full flex flex-col items-start leading-space text-xl">
      <p style="max-width: 700px;" class="title">{{ product.title }}</p>
      <!-- <div class="">
        ⭐ {{ product.rating.rate }} / 5 ({{ product.rating.count }} reviews)
      </div> -->
      <p class="text-xl">Category: {{ product.category }}</p>
      <p class="price">$ {{ product.price }}</p>
      <p style="max-width: 800px;" class="description">{{ product.description }}</p>
     


      <div style="gap: 15px;margin: 10px 0;" class="flex flex-col">
      <button class="buy-btn">Buy Now</button>
      <!-- <button @click="toggleToCartFunc(id)" class="buy-btn">{{ itemInCart?"Remove":"Add" }} to Cart</button> -->
      <button v-show="!itemInCart" @click="addToCart" class="buy-btn">Add to Cart</button>
      <button v-show="itemInCart" @click="removeFromCart" class="buy-btn">Remove from Cart</button>
    </div>

    <Policy />
    </div>
  </div>


  <div class="w-full mt-40 ">
    <p style="margin-bottom: 20px;font-size: 28px;">Similar category You might like</p>
  <div   class="w-full mt-10 flex items-center gap-60 overflow-x-auto noWrap ">
    <div  @click="fetchNewProduct(ele.id)" class="extra-products pointer" v-for="ele in extraProducts"  :key="ele.id">
       <div @click="$router.push(`/products/${ele.id}`)" style="width: 150px;height: 190px;margin: 0 auto;">    
        <img :src="ele.image" width="100%" style="height: 100%; object-fit: contain;"  />
            <span class="absolute top-25 right-15 ">⭐ {{ ele.rating.rate }}</span>
        </div> 
        <p class="text-wrap mt-5 w-full ">{{ ele.title.slice(0,30) }}...</p>
    </div>
  </div>

</div>

</div>

</div>

</template>


<style scoped>
.container{padding:20px;}
.product-img{
  width: 350px;
  margin: auto;
  
}

.title{
    font-size: 36px;
}
.category{}

.price{font-size: 30px;}

.description{
    font-size: 24px;
}



.buy-btn {
    width: 300px;
    /* margin-top: 10px; */
    background: #28a745;
    color: white;
    transition: 0.3s;
  }
  
  .buy-btn:hover {
    background: #218838;
  }

  .extra-products{
width: 190px;
margin: 0 20px;
/*  */
}

@media (max-width: 650px) {
  .container {
    padding: 8px;
  }
  .description{
    font-size:22px;
 }
}


@media (max-width: 750px) {
 .title{
    font-size: 32px;
 }
 
}




</style>