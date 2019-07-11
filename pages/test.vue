<template>
  <div >
    <div class="nav">
      <span
        v-for="(item,　index) in ['新闻','体育','花边']"
        :key="index"
        :class="{ active: current === index }"
        @click="handleClick(index)"
      >{{item}}</span>
    </div>
    <div v-if="current===0">
      <ul>
        <li>123456</li>
        <li>123456</li>
        <li>123456</li>
        <li>123456</li>
      </ul>
    </div>
    <div v-if="current===1">
      <ul>
        <li>654123</li>
        <li>654123</li>
        <li>654123</li>
        <li>654123</li>
      </ul>
    </div>
    <div v-if="current===2">
      <ul>
        <li>888888</li>
        <li>888888</li>
        <li>888888</li>
        <li>888888</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {
    handleClick(index) {
        console.log(111);
      
      this.current =index;

    
    }
  }
};
</script>

<style>
.nav{
    padding: 10px
}
span{
    padding: 10px;
   
    cursor: pointer;
}
.active{
    color: yellowgreen
}
</style>
