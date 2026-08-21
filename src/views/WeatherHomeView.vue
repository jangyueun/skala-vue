<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import { weatherData } from '../data/weather'

const router = useRouter()
const weatherList = ref(weatherData)
const searchQuery = ref('')
const selectedCity = ref(null)
const showExtraInfo = ref(true)

const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()
  if (!keyword) return weatherList.value
  return weatherList.value.filter((weather) => weather.name.includes(keyword))
})

const averageTemp = computed(() => {
  const total = weatherList.value.reduce((sum, weather) => sum + weather.temp, 0)
  return (total / weatherList.value.length).toFixed(1)
})

const statusMessage = computed(() =>
  selectedCity.value
    ? `${selectedCity.value.name}이(가) 선택되었습니다.`
    : '지역별 날씨 카드를 선택해 주세요.',
)

const goToDetail = (weather) => {
  router.push(`/weather/${weather.id}`)
}
</script>

<template>
  <main class="weather-page">
    <section class="weather-dashboard">
      <header class="dashboard-header">
        <div>
          <p class="eyebrow">WEATHER ROUTER</p>
          <h1>🌤️ 지역별 날씨</h1>
        </div>
        <div class="average-temperature">
          <span>전체 평균 기온</span>
          <strong>{{ averageTemp }}℃</strong>
        </div>
      </header>

      <BaseDashboardCard>
        <SearchBar :search-query="searchQuery" @update-query="searchQuery = $event" />
      </BaseDashboardCard>

      <p class="status-bar">{{ statusMessage }}</p>

      <BaseDashboardCard>
        <div class="list-heading">
          <h2>🏙️ 지역별 날씨 현황</h2>
          <label><input v-model="showExtraInfo" type="checkbox" /> 추가 정보 표시</label>
        </div>

        <section v-if="filteredWeatherList.length" class="weather-grid">
          <WeatherCard
            v-for="weather in filteredWeatherList"
            :key="weather.id"
            :weather="weather"
            :show-extra-info="showExtraInfo"
            @select-card="selectedCity = $event"
            @click-detail="goToDetail"
          />
        </section>

        <div v-else class="empty-state">
          <h2>검색 결과가 없습니다.</h2>
          <p>다른 도시 이름을 입력해 보세요.</p>
        </div>
      </BaseDashboardCard>
    </section>
  </main>
</template>

<style scoped>
.weather-page {
  min-height: calc(100vh - 70px);
  padding: 44px 20px;
  color: #152238;
  background: linear-gradient(180deg, #f8fbff, #e9f0f7);
}
.weather-dashboard {
  display: grid;
  gap: 20px;
  width: min(1120px, 100%);
  margin: auto;
}
.dashboard-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}
.eyebrow {
  margin: 0 0 8px;
  color: #2874c6;
  font-weight: 800;
  letter-spacing: 0.14em;
}
h1 {
  margin: 0;
  font-size: clamp(30px, 5vw, 48px);
}
.average-temperature {
  min-width: 170px;
  padding: 18px 20px;
  border-radius: 18px;
  background: #fff;
}
.average-temperature span,
.average-temperature strong {
  display: block;
}
.average-temperature span {
  color: #607089;
  font-size: 13px;
}
.average-temperature strong {
  margin-top: 4px;
  font-size: 28px;
}
.status-bar {
  margin: 0;
  padding: 14px 18px;
  border-left: 4px solid #2874c6;
  border-radius: 4px 12px 12px 4px;
  color: #1d4f83;
  background: #dcecff;
  font-weight: 700;
}
.list-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}
.list-heading h2 {
  margin: 0;
  font-size: 18px;
}
.list-heading label {
  color: #607089;
  font-size: 14px;
}
.weather-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}
.empty-state {
  padding: 60px 20px;
  text-align: center;
  color: #607089;
}
@media (max-width: 860px) {
  .weather-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 620px) {
  .dashboard-header,
  .list-heading {
    align-items: stretch;
    flex-direction: column;
  }
  .weather-grid {
    grid-template-columns: 1fr;
  }
}
</style>
