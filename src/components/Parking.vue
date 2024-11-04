<template>
  <div class="parking">
    <div class="search-box">
      <input type="text" v-model="searchQuery" placeholder="搜索地点...">
      <button @click="performSearch">搜索</button>
    </div>
    <div id="allmap"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import parkingImage from '@/assets/parking.jpg';

let map;
let searchService;
const searchQuery = ref('');

// 初始化地图
const init = () => {
  const BMap = window.BMap;
  map = new BMap.Map("allmap");
  map.centerAndZoom(new BMap.Point(112.472529, 23.051546), 11);
  map.setCurrentCity("肇庆");
  map.enableScrollWheelZoom(true);

  // 初始化搜索服务
  searchService = new BMap.LocalSearch(map, {
    onSearchComplete: function(results) {
      // 清除旧的搜索结果
      map.clearOverlays();
      if (results && results.getPoi(0)) {
        const points = results.getPoi(0);
        map.centerAndZoom(points.getCenter(), 15);
        addMarker({
          id: 'searchResult',
          name: points.title,
          longitude: points.point.lng,
          latitude: points.point.lat
        });
      }
    }
  });

  addMarker({ 
    id: 31, 
    name: "星湖国际", 
    longitude: 112.472529, 
    latitude: 23.129843 
  });
};

// 执行搜索
const performSearch = () => {
  if (searchService && searchQuery.value) {
    searchService.search(searchQuery.value);
  }
};

// 添加标记
const addMarker = ({ id, name, longitude, latitude }) => {
  const BMap = window.BMap;
  var point = new BMap.Point(longitude, latitude);
  var icon = new BMap.Icon(parkingImage, new BMap.Size(40, 40));
  var marker = new BMap.Marker(point, { icon }); // 创建标记
  var infoWindow = new BMap.InfoWindow(`名称: ${name}<br>剩余停车位: ${id}`); // 创建信息窗口对象
  marker.addEventListener("click", function(){          
    this.openInfoWindow(infoWindow); // 开启信息窗口
  }); 
  map.addOverlay(marker);  
};

const loadMapScript = () => {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.className = "loadmap";
  script.src =
    "https://api.map.baidu.com/getscript?v=3.0&ak=w6n8GhWyvRar2rk44CuOw53CKNZaUXB6";      
  script.onload = () => {
    init();
  };
  let loadmap = document.getElementsByClassName("loadmap");
  if (loadmap) {
    for (var i = 0; i < loadmap.length; i++) {
      document.body.removeChild(loadmap[i]);
    }
  }
  document.body.appendChild(script);
};

onMounted(() => {
  loadMapScript();
});
</script>

<style scoped>
.parking {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: wheat;
  font-size: 18px;
  text-align: center;
  background-color: #333;
}

.search-box {
  margin-bottom: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
}

.search-box input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-box button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-box button:hover {
  background-color: #0056b3;
}

::v-deep(.BMap_cpyCtrl) {
  display: none;
}
 
::v-deep(.anchorBL) {
  display: none !important;
}
 
#allmap {
  width: 100%;
  height: 100%;
  margin: auto;
}
</style>