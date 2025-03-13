

<script>
export default {
  data() {
    return {
      isOpen: false,
      isLogin:JSON.stringify(localStorage.getItem('token')) || null
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    authFunc(){
      if(this.isLogin){
        localStorage.removeItem('token')
        this.isLogin=false
      }
      else{
        this.$router.push('/login')
      }
    }
  },
  
};
</script>



<template>
    <header>
      <div class="logo">MyLogo</div>
      <nav :class="{ 'open': isOpen }">
        <ul style="padding: 0 90px;">
          <li><a href="#">Home</a></li>
          <li @click="authFunc"><a href="#">{{ isLogin?"Logout":"Login" }}</a></li>
        
        </ul>
      </nav>
      <button class="menu-btn" @click="toggleMenu">{{ isOpen?'X':'☰' }}</button>
    </header>
  </template>
  

  <style>
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: #333;
    color: white;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    gap: 15px;
    padding: 0;
    margin: 0;
  }
  
  nav ul li a {
    color: white;
    text-decoration: none;
  }
  
  .menu-btn {
    display: none;
    font-size: 24px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    nav {
      display: none;
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      background: #444;
      padding: 10px 0;
    }
  
    nav.open {
      display: block;
    }
  
    nav ul {
      flex-direction: column;
      align-items: center;
    }
  
    .menu-btn {
      display: block;
    }
  }
  </style>