<script setup lang="ts" name="App">
import { RouterView,RouterLink } from 'vue-router';
import { ref } from 'vue';
import LoginModal from '@/components/LoginModal.vue';
const isLoginModalVisible = ref(false);
</script>

<template>
  <div class="content">
    <div class="header">
      <img src="E:\smart car\src\assets\2.png" alt="">
      <h1>智能泊车系统</h1>
      <button @click="isLoginModalVisible = true">登录</button>
    </div>
    <div class="wip">
      <div class="nav-list">
        <RouterLink to="/payment" class="nav-item">自助缴费</RouterLink>
        <RouterLink to="/parking" class="nav-item">泊车点查询</RouterLink>
        <RouterLink to="/news" class="nav-item">新闻资讯</RouterLink>
        <RouterLink to="/service" class="nav-item">客服反馈</RouterLink>
      </div>
      <div class="map">
        <RouterView v-if="$route.path !== '/login'"></RouterView>
      </div>
    </div>
    <!-- 登录模态框 -->
    <LoginModal :isVisible="isLoginModalVisible" @update:isVisible="isLoginModalVisible = $event" />
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  height: 100%;
  width: 100%;
  background-image: url('@/assets/3.jpg'); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden; 
}
.header{
  height: 20%;
  width: 100%;
  background-color: blanchedalmond;
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
}
.header img{
  height: 100%;
  width: 160px;
  object-fit: cover; /* 确保图片覆盖整个区域而不变形 */
}
.header h1{
  margin: auto; 
  text-align: center; 
  color: #333;
}
.nav-list {
  margin-top: 20px;
  height: 700px;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center; 
  padding: 1px solid black;
  border-radius: 10px;
  gap: 20px; 
}
.nav-item {
  background-color: #00FFFF;
  cursor: pointer;
  text-align: center;
  padding: 30px; 
  border: 1px solid black;
  transition: background-color ;
  text-decoration: none;
  border-radius: 10px;
  font-size: 30px;
  letter-spacing: 5px;
  width: 100%; 
}

.nav-item:hover { /* 选择时变色 */
  background-color: #0000FF;
}
.map{
  width: 75%;
  height: 700px;
  border: 2px solid black;
  margin-top: 20px;
  margin-left: 50px;
  border-radius: 10px;
  align-items: center;
  text-align: center;
}
.wip div{
  float: left;
}


</style>
