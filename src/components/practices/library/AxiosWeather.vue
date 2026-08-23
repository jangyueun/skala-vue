<script setup>
import { ref } from 'vue'
import axios from 'axios'

const weatherData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const handleFetchWeather = async () => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (!apiKey) {
    errorMessage.value = 'VITE_OPENWEATHER_API_KEY를 먼저 설정해 주세요.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: 'Seoul', appid: apiKey, units: 'metric', lang: 'kr' },
    })
    weatherData.value = response.data
  } catch (error) {
    console.error('날씨 통신 실패:', error)
    errorMessage.value = '날씨 데이터를 가져오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="practice-section">
    <h2>⚡ Axios 날씨 통신 검증</h2>
    <button type="button" :disabled="isLoading" @click="handleFetchWeather">
      {{ isLoading ? '데이터 로딩 중...' : '실시간 날씨 가져오기' }}
    </button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div v-if="weatherData" class="result-card">
      <p>
        📍 위치: <strong>{{ weatherData.name }}</strong>
      </p>
      <p>
        🌡️ 현재 기온: <strong>{{ weatherData.main.temp }}℃</strong>
      </p>
      <p>
        ☁️ 날씨: <strong>{{ weatherData.weather[0].description }}</strong>
      </p>
      <p>
        💧 습도: <strong>{{ weatherData.main.humidity }}%</strong>
      </p>
    </div>
  </section>
</template>

<style scoped>
.result-card {
  margin-top: 14px;
  padding: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
}
.error {
  color: #c0392b;
}
</style>
