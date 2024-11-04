<template>
  <div class="service">
    <h2>客服反馈</h2>
    <div class="feedback-form">
      <h3>问题收集</h3>
      <form @submit.prevent="submitFeedback">
        <label for="name">姓名:</label>
        <input type="text" id="name" v-model="feedback.name" required>

        <label for="email">邮箱:</label>
        <input type="email" id="email" v-model="feedback.email" required>

        <label for="issue">问题:</label>
        <textarea id="issue" v-model="feedback.issue" required></textarea>

        <button type="submit" :disabled="isSubmitting">
          提交
          <span v-if="isSubmitting">中...</span>
        </button>
      </form>
      <p v-if="successMessage">{{ successMessage }}</p>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
    <div class="faq">
      <h3>常见问题解答</h3>
      <input type="search" v-model="searchQuery" placeholder="搜索问题..." />
      <div v-for="({ question, answer }, index) in filteredAnswers" :key="index" class="faq-item">
        <strong>{{ question }}</strong>
        <p>{{ answer }}</p>
      </div>
      <!-- 当没有搜索结果时显示提示 -->
      <p v-if="searchQuery && filteredAnswers.length === 0">没有找到相关问题。</p>
    </div>
  </div>
</template>

<script lang="ts" name="Service">
import { defineComponent, reactive, ref, computed } from 'vue';

export default defineComponent({
  name: 'Service',
  setup() {
    const feedback = reactive({
      name: '',
      email: '',
      issue: ''
    });

    const answers = reactive({
      '如何注册账号？': '访问我们的网站并点击注册按钮，按照提示完成注册流程。',
      '如何找回密码？': '点击登录页面的“忘记密码”链接，按照提示操作。',
      '如何联系客服？': '您可以通过本页面提交您的问题，或者发送邮件至1539598168@qq.com。'
    });

    const isSubmitting = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');

    const submitFeedback = async () => {
      isSubmitting.value = true;
      try {
        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(feedback)
        });
        if (response.ok) {
          successMessage.value = '感谢您的反馈！';
          feedback.name = '';
          feedback.email = '';
          feedback.issue = '';
        } else {
          throw new Error('网络错误');
        }
      } catch (error) {
        errorMessage.value = '提交失败: ' + error.message;
      } finally {
        isSubmitting.value = false;
      }
    };

    const searchQuery = ref('');
    const filteredAnswers = computed(() =>
      searchQuery.value.trim() === '' ? [] : Object.entries(answers).filter(([key]) => key.toLowerCase().includes(searchQuery.value.toLowerCase())).map(([key, value]) => ({ question: key, answer: value }))
    );

    return {
      feedback,
      answers,
      submitFeedback,
      isSubmitting,
      successMessage,
      errorMessage,
      searchQuery,
      filteredAnswers
    };
  }
});
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.service {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: wheat;
  font-size: 18px;
  background-color: #333;
  padding: 20px;
}
.feedback-form, .faq {
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
}
h2, h3 {
  text-align: center;
  color: #fff;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 10px;
}
input, textarea {
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px;
  margin-top: 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.7;
}
button:hover {
  background-color: #218838;
}
button:disabled {
  opacity: 0.5;
}
.faq-item {
  margin-bottom: 15px;
}
input[type="search"] {
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
@media (max-width: 768px) {
  .service {
    padding: 10px;
  }
}
</style>