<script>
import apiHelper from "../utils/apiHelper";
import Loader from "../components/Loader.vue";

export default {
  data() {
    return {
      isLogin: true,
      loginName: "johnd",
      loginPassword: "m38rmF$",
      registerName: "",
      registerEmail: "",
      registerPassword: "",
      showLoginPassword: false,
      showRegisterPassword: false,
      isLoader:false
    };
  },
  components:{
    Loader
  },
  methods: {
    async handleLogin() {
      if (!this.loginName || !this.loginPassword)
        return this.$toast.error("All fiels are required!");
     this.isLoader=true
        const response = await apiHelper.post("auth/login", {
          username: this.loginName,
          password: this.loginPassword,
        });
        this.isLoader=false
        console.log("the response from api helper is",response)
if(response.status) {
    localStorage.setItem('token',response.result.token)
    this.$router.push("/products");
}else{
    this.$toast.error(response.result)
}
      
    },
 async handleRegister() {
    if (!this.registerName || !this.registerPassword || !this.registerEmail)
    return this.$toast.error("All fiels are required!");

    this.isLoader=true
    const response = await apiHelper.post("users", {
        id:0,
          username: this.registerName,
          email:this.registerEmail,
          password: this.registerPassword,
        });
        this.isLoader=false  
        console.log("the response from api helper is",response)
if(response.status) {
    this.$toast.success("Registration successful! Log In.")
    console.log(response.result)
    // localStorage.setItem('token',response.result)
    // this.$router.push("/home");
    this.isLogin=true
    this.loginName=this.registerName
    this.loginPassword=this.registerPassword
}else{
    this.$toast.error(response.result)
}

},
  },
};
</script>

<template>
  <div class="w-full flex justify-center h-min">
<div v-show="isLoader" class="m-auto">
    <Loader  />
</div>
    <div v-show="!isLoader" class="w-full">
      <div class="tabs">
        <button
          :class="{ active: isLogin }"
          class="button bg-white button-border"
          @click="isLogin = true"
        >
          Login
        </button>
        <button
          :class="{ active: !isLogin }"
          class="button bg-white button-border"
          @click="isLogin = false"
        >
          Register
        </button>
      </div>

      <div
        v-if="isLogin"
        style="gap: 10px"
        class="w-full flex flex-col justify-center items-center"
      >
        <input
          class="input"
          type="text"
          v-model="loginName"
          placeholder="Username"
        />
        <div class="input flex">
          <input
            :type="showLoginPassword ? 'text' : 'password'"
            v-model="loginPassword"
            placeholder="Password"
            class="outline-none border-none w-full"
          />
          <i
            @click="showLoginPassword = !showLoginPassword"
            :class="showLoginPassword?'ri-eye-line':'ri-eye-off-line'"
            class="pointer"
          ></i>
        </div>
        <button style="margin-top: 20px" class="button" @click="handleLogin">
          Login
        </button>
      </div>

      <div v-else      style="gap: 10px"
      class="w-full flex flex-col justify-center items-center">
        <input type="text" class="input" v-model="registerName" placeholder="Name" />
        <input type="email" class="input" v-model="registerEmail" placeholder="Email" />
        <div class="input flex">
          <input :type="showRegisterPassword ? 'text' : 'password'" v-model="registerPassword" placeholder="Password"  class="outline-none border-none w-full" />
          <i
            @click="showRegisterPassword = !showRegisterPassword"
             :class="showRegisterPassword?'ri-eye-line':'ri-eye-off-line'"
            class="pointer"
          ></i>
        </div>
        <button style="margin-top: 20px" class="button" @click="handleRegister">Register</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  padding: 5px;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 20px;
  gap: 5px;
}
.tabs .active {
  background: #333;
  color: white;
}
.button-border {
  border: 1px solid black;
  color: black;
}
</style>
