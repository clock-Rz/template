<template>
 <div id="exit" @click="exit"></div>
 <router-view></router-view>
</template>

<script setup>
function exit(){
  console.log('click exit');
}
</script>

<style lang="scss">
@import './assets/css/reset.css';
#exit {
  position: fixed;
  top: 0;
  left: 0;
  width: 5vw;
  height: 5vw;
  line-height: 5vw;
  text-align: center;
  color: transparent;
  z-index: 999;
}
[noSelect] *,
[noSelect] {
  user-select: none;
  -webkit-user-drag: none;
}

</style>