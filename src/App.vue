
<script> 
import Header from './components/Header.vue'

export default{
  name:'App',
components:{
  Header
}
}

</script>


<template>
  <div class="w-full">
    <!-- <div style="background-color: red;" class="w-full">bg</div> -->
    <Header />
    <router-view />
  </div>
</template>
