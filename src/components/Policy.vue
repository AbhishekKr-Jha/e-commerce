


<script>  

export default{
    name:'Policy',
    data(){
        return{
     features : [
  {
    icon: "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB562549966_.png",
    text: "Free Delivery"
  },
  {
    icon: "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB562506657_.png",
    text: "Pay on Delivery"
  },
  {
    icon: "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png",
    text: "7 days Replacement"
  },
  {
    icon: "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png",
    text: "6 Month Warranty"
  },
  {
    icon: "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-top-brand._CB562506657_.png",
    text: "Top Brand"
  },
  {
    icon: "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB562550117_.png",
    text: "Amazon Delivered"
  },
  {
    icon: "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/Secure-payment._CB650126890_.png",
    text: "Secure Payment"
  }
]
 }
    }
}
</script>

<template>
    <!-- https://i.ibb.co/PvDTwxWP/cars.png -->
    
    <div class="w-full">
    <hr>   
    <div class="feature-container">
  <div class="feature-wrapper">
    <div class="feature" v-for="(item, index) in features" :key="index">
      <img :src="item.icon" :alt="item.text" class="feature-icon" />
      <p class="feature-text">{{ item.text }}</p>
    </div>
  </div>
</div>


<hr>
</div>
</template>


<style scoped> 
.feature-container {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */
}

.feature-container::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Chrome/Safari */
}

.feature-wrapper {
  display: flex;
  gap: 30px;
  padding: 10px;
}

.feature {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100px;
}

.feature-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.feature-text {
  font-size: 14px;
  color: #333;
  margin-top: 5px;
}

</style>