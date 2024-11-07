<template>
  <div class="news">
    <h2>新闻资讯</h2>
    <input type="search" v-model="searchQuery" placeholder="搜索新闻..." />
    <div class="news-list" v-if="filteredNewsItems.length > 0">
      <div class="news-item" v-for="(item, index) in filteredNewsItems" :key="index">
        <img :src="item.imageUrl" alt="News image" class="news-image">
        <div class="news-content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
          <small>发布日期：{{ item.date }}</small>
          <button @click="goToDetails(item.id)">阅读更多</button>
        </div>
      </div>
    </div>
    <p v-else>暂无新闻资讯。</p>
  </div>
</template>

<script lang="ts" name="news">
import { defineComponent, ref, computed } from 'vue';
import newsImage from '@/assets/news.png';

export default defineComponent({
  name: 'News',
  setup() {
    const newsItems = ref([
      { id: 1, title: '国际大会', summary: '这里是新闻摘要1...', imageUrl: newsImage, date: '2024-01-01' },
      { id: 2, title: '新闻标题2', summary: '这里是新闻摘要2...', imageUrl: 'path-to-image2.jpg', date: '2024-01-02' },
      { id: 3, title: '新闻标题3', summary: '这里是新闻摘要3...', imageUrl: 'path-to-image3.jpg', date: '2024-01-03' },
      { id: 3, title: '新闻标题4', summary: '这里是新闻摘要4...', imageUrl: 'path-to-image4.jpg', date: '2024-01-04' },
      // 更多新闻项...
    ]);

    const searchQuery = ref('');

    const filteredNewsItems = computed(() =>
      newsItems.value.filter(item => item.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );

    const goToDetails = (id) => {
      // 这里可以添加跳转到新闻详情页面的逻辑
      console.log('跳转到新闻详情页面:', id);
    };

    return {
      newsItems,
      searchQuery,
      filteredNewsItems,
      goToDetails,
    };
  },
});
</script>

<style scoped>
.news {
  height: 100%;
  width: 100%;
  color: wheat;
  font-size: 18px;
  text-align: center;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-x: hidden; /* 防止水平滚动 */
}

.news-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100%; /* 设置最大高度 */
  overflow-y: auto; /* 添加垂直滚动条 */
}

.news-item {
  display: flex;
  background-color: #444;
  margin: 10px;
  padding: 12px;
  border-radius: 8px;
  width: calc(100% - 24px); /* 减去margin的宽度 */
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

.news-item:hover {
  transform: translateY(-5px);
}

.news-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 15px;
}

.news-content {
  flex-grow: 1;
}

.news-item h3 {
  color: #fff;
  margin-bottom: 10px;
}

.news-item p {
  color: #aaa;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #218838;
}

input[type="search"] {
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 80%;
  text-align: center;
}

@media (max-width: 768px) {
  .news-item {
    flex-direction: column;
    width: 90%;
  }

  .news-image {
    width: 100%;
    height: auto;
  }
}
</style>