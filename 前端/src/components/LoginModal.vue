<template>
    <div v-if="isVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h1 class="title">{{ isLogin ? '登录' : '注册' }}</h1>
        <!-- <form @submit.prevent="handleForm" class="form"> -->
        <form class="form">
          <div v-if="isLogin" class="input-group">
            <div class="login-type-container">
              <button class="login-type" :class="{'active': loginType === 'username'}" @click="loginType = 'username'">用户名</button>
              <button class="login-type" :class="{'active': loginType === 'phone'}" @click="loginType = 'phone'">手机号</button>
              <div class="login-type-indicator" :style="indicatorStyle"></div>
            </div>
            <input :type="inputType" :placeholder="inputPlaceholder" v-model="loginValue" required />
            <input type="password" placeholder="密码" v-model="password" required />
          </div>
          <div v-else class="input-group">
            <input type="text" placeholder="用户名" v-model="username" required />
            <input type="email" placeholder="邮箱" v-model="email" required />
            <input type="password" placeholder="密码" v-model="password" required />
          </div>
          <div class="action-buttons">
            <!-- <button type="submit" class="submit-button">{{ isLogin ? '登录' : '注册' }}</button> -->
            <button class="submit-button">{{ isLogin ? '登录' : '注册' }}</button>

            <button type="button" class="toggle-button" @click="toggleForm">{{ isLogin ? '注册' : '登录' }}</button>
          </div>
        </form>
        <div class="third-party-login">
          <button class="social-button wechat" @click="handleSocialLogin('wechat')"></button>
          <button class="social-button qq" @click="handleSocialLogin('qq')"></button>
          <button class="social-button alipay" @click="handleSocialLogin('alipay')"></button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  import { login, register } from '../utils/api.js'; 

  const props = defineProps({
    isVisible: Boolean
  });
  const emit = defineEmits(['update:isVisible']);
  
  const isLogin = ref(true); // 控制显示登录还是注册表单
  const username = ref('');
  const password = ref('');
  const email = ref('');
  const loginType = ref('username'); // 默认使用用户名登录
  const loginValue = ref('');
  
  const closeModal = () => {
    emit('update:isVisible', false);
  };
  
  const handleForm = async () => {
  // 检查输入字段是否为空
  if (!loginValue.value || !password.value) {
    alert('请填写所有字段');
    return;
  }
  
  try {
    if (isLogin.value) {
      // 调用登录API
      const result = await login(loginValue.value, password.value);
      console.log(result);
      // 处理登录成功逻辑，例如保存token等
    } else {
      // 调用注册API
      const result = await register(username.value, '1234567890', password.value); // 假设电话号码是硬编码的
      console.log(result);
      // 处理注册成功逻辑
    }
    // 关闭模态框
    closeModal();
  } catch (error) {
    console.error(error);
    alert('操作失败：' + error.message);
  }
};
  
  const toggleForm = () => {
    isLogin.value = !isLogin.value;
  };
  
  const handleSocialLogin = (platform) => {
    console.log(`Handling social login for platform: ${platform}`);
    // 这里添加第三方登录逻辑
  };
  
  const inputType = ref('text');
  const inputPlaceholder = ref('用户名');
  
  watch(loginType, (newType) => {
    if (newType === 'username') {
      inputType.value = 'text';
      inputPlaceholder.value = '用户名';
    } else {
      inputType.value = 'tel';
      inputPlaceholder.value = '手机号';
    }
  });
  
  const indicatorStyle = ref({
    left: loginType.value === 'username' ? '0%' : '50%',
    transition: 'left 0.3s ease-in-out'
  });
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    backdrop-filter: blur(10px);
  }
  
  .modal-content {
    background: linear-gradient(135deg, #74b9ff 0%, #ff8c00 100%);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 350px;
    max-width: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: relative;
  }
  
  .close {
    position: absolute;
    top: 0;
    right: 10px;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
  }
  
  .title {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .form {
    width: 100%;
  }
  
  .input-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  input {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    color: #333;
    transition: border-color 0.3s, background-color 0.3s;
    text-align: center;
    width: 80%;
  }
  
  input:focus {
    border-color: #007bff;
    background-color: #fff;
  }
  
  .action-buttons {
    display: flex;
    margin-top: 20px;
    flex-direction: row;
    justify-content: center;
    gap: 10px; /* 按钮之间的距离 */
  }
  
  button {
    padding: 12px;
    border: none;
    border-radius: 6px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    width: 80%;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .submit-button {
    flex: 1; /* 使按钮占据相同空间 */
  }
  
  .toggle-button {
    flex: 1; /* 使按钮占据相同空间 */
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  }
  
  .toggle-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .third-party-login {
    display: flex;
    width: 80%;
    justify-content: space-around;
    margin-top: 20px;
  }
  
  .social-button {
    background-color: transparent;
    border: 1px solid #fff;
    color: #fff;
    padding: 10px;
    border-radius: 50%; /* 圆形 */
    cursor: pointer;
    transition: background-color 0.3s;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
  
  .social-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .wechat {
    background-color: #7bb32e;
    border-color: #7bb32e;
  }
  
  .qq {
    background-color: #3a77ca;
    border-color: #3a77ca;
  }
  
  .alipay {
    background-color: #1c79c0;
    border-color: #1c79c0;
  }
  
  .login-type-container {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 20px 0; /* 增加上边距 */
    position: relative;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    overflow: hidden;
  }
  
  .login-type {
    padding: 10px;
    cursor: pointer;
    border: none;
    border-radius: 0;
    background-color: transparent;
    color: #fff;
    flex: 1;
    text-align: center;
    position: relative;
    z-index: 2;
    transition: color 0.3s;
  }
  
  .login-type.active {
    color: #007bff;
  }
  
  .login-type-indicator {
    position: absolute;
    bottom: 0;
    height: 4px;
    background-color: #007bff;
    width: 50%;
    left: 0;
    border-radius: 40px;
    transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
  }
  </style>