

<script>
export default {
  data() {
    return {
      isLogin:JSON.stringify(localStorage.getItem('token')) || null
    };
  },
methods:{
    authFunc(){
      if(this.isLogin){
        localStorage.removeItem('token')
        this.isLogin=false
      }
      else{
        this.$router.push('/login')
      }
    }
}
}



  </script>



<template>
    
<div class="w-full h-min flex justify-center items-center">

<button @click="authFunc" type="button">{{ isLogin ? "Logout": "Login" }}</button>

</div>


</template>