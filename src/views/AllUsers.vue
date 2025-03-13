<script>
import apiHelper from "../utils/apiHelper";
import Loader from "../components/Loader.vue";



export default {
  data() {
    return {
    userLists:[],
    isLoader:true
    };
  },
  components:{
Loader
  },
  methods:{
async getAllUsers (){
    this.isLoader=true
    const response= await apiHelper.get('users')
    console.log("the response in getAllUser",response)
    this.isLoader=false
    if(response.status){
this.userLists=response.result
this.$toast.success("Users fetched successfully")
    }else{
        this.$toast.error(response.result)
     }
}
  },
  created(){
    this.getAllUsers()
  }
};
</script>

<template>
  <div class="w-full flex flex-col items-center  pt-20 h-min ">
      <h2 class="text-center">All Users</h2>
    <div v-show="isLoader" class="m-auto">
    <Loader  />
</div>
<div v-show="!isLoader" class="w-full flex flex-wrap gap-20 justify-center">
    <div  class="card " v-for="ele in userLists"  :key="ele.id">
      <p><strong>Username:</strong> {{ ele.username || "Default" }}</p>
      <p class="mt-5"><strong>Email:</strong> {{ ele.email || "Default" }}</p>
    </div>
</div>
  </div>
</template>

<style scoped>
/* Center the card */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Card styling */
.card {
  background: white;
  padding: 20px 10px;
  width:90%;
  border-radius: 10px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 250px;
  gap: 20px;
}
</style>
