// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://your-api-base-url.com'; // 替换为您的API基础URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 用户登录
export const login = async (usernameOrPhone, password) => {
  try {
    const response = await apiClient.post('/login', {
      [usernameOrPhone.includes('@') ? 'email' : 'username']: usernameOrPhone,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 用户注册
export const register = async (username, telephone, password) => {
  try {
    const response = await apiClient.post('/register', {
      username,
      telephone,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};