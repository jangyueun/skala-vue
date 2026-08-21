<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import WeatherSummary from './WeatherSummary.vue'

const weatherList = ref([
  {
    id: 'city_01',
    name: '서울',
    temp: 28,
    status: '맑음',
    icon: '☀️',
    humidity: 54,
    wind: 2.1,
    fineDust: '보통',
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 24,
    status: '비',
    icon: '🌧️',
    humidity: 78,
    wind: 3.4,
    fineDust: '좋음',
  },
  {
    id: 'city_03',
    name: '부산',
    temp: 26,
    status: '구름',
    icon: '☁️',
    humidity: 68,
    wind: 4.2,
    fineDust: '보통',
  },
  {
    id: 'city_04',
    name: '제주',
    temp: 23,
    status: '바람',
    icon: '🌬️',
    humidity: 72,
    wind: 6.8,
    fineDust: '좋음',
  },
  {
    id: 'city_05',
    name: '대전',
    temp: 30,
    status: '폭염',
    icon: '🔥',
    humidity: 48,
    wind: 1.5,
    fineDust: '나쁨',
  },
])

const searchQuery = ref('')
const selectedCityInfo = ref(null)
const showExtraInfo = ref(true)

const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()
  if (!keyword) return weatherList.value
  return weatherList.value.filter((weather) => weather.name.includes(keyword))
})

const statusMessage = computed(() => {
  if (!selectedCityInfo.value) return '지역별 날씨 카드를 선택해 주세요.'
  return `${selectedCityInfo.value.name}이(가) 선택되었습니다.`
})

const averageTemp = computed(() => {
  const total = weatherList.value.reduce((sum, weather) => sum + weather.temp, 0)
  return (total / weatherList.value.length).toFixed(1)
})

const hotCityCount = computed(
  () => weatherList.value.filter((weather) => weather.temp >= 25).length,
)

watch(selectedCityInfo, (newCity, oldCity) => {
  console.log(`[선택 도시 변경] ${oldCity?.name ?? '선택 없음'} → ${newCity?.name ?? '선택 없음'}`)
  console.log(`[상태바 변경] ${statusMessage.value}`)
})

watch(showExtraInfo, (isVisible) => {
  console.log(`[추가 정보] ${isVisible ? '표시' : '숨김'}`)
})

watchEffect(() => {
  console.log(`[검색어 감시] 현재 검색어: ${searchQuery.value || '없음'}`)
})

const updateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const selectCity = (weather) => {
  selectedCityInfo.value = weather
}

const showDetail = (weather) => {
  window.alert(`${weather.name}의 현재 날씨는 [${weather.status}] 상태입니다.`)
}
</script>

<template>
  <main class="weather-page">
    <section class="weather-dashboard">
      <WeatherSummary :average-temp="averageTemp" :hot-city-count="hotCityCount" />

      <BaseDashboardCard>
        <SearchBar :search-query="searchQuery" @update-query="updateQuery" />
      </BaseDashboardCard>

      <p class="status-bar" aria-live="polite">{{ statusMessage }}</p>

      <BaseDashboardCard>
        <div class="weather-list-heading">
          <h2 class="section-title">🏙️ 지역별 날씨 현황</h2>
          <label class="extra-info-toggle">
            <input v-model="showExtraInfo" type="checkbox" />
            추가 정보 표시
          </label>
        </div>

        <section
          v-if="filteredWeatherList.length"
          class="weather-grid"
          aria-label="지역별 날씨 목록"
        >
          <WeatherCard
            v-for="weather in filteredWeatherList"
            :key="weather.id"
            :weather="weather"
            :show-extra-info="showExtraInfo"
            @select-card="selectCity"
            @click-detail="showDetail"
          />
        </section>

        <section v-else class="empty-state">
          <span aria-hidden="true">🔍</span>
          <h2>검색 결과가 없습니다.</h2>
          <p>다른 도시 이름을 입력해 보세요.</p>
        </section>
      </BaseDashboardCard>
    </section>
  </main>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}
:global(body) {
  min-width: 320px;
  margin: 0;
  background: #eef3f8;
}
:global(button),
:global(input) {
  font: inherit;
}
.weather-page {
  min-height: 100vh;
  padding: 48px 20px;
  color: #152238;
  background:
    radial-gradient(circle at top left, rgb(74 144 226 / 18%), transparent 34%),
    linear-gradient(180deg, #f8fbff 0%, #e9f0f7 100%);
}
.weather-dashboard {
  display: grid;
  gap: 20px;
  width: min(1120px, 100%);
  margin: 0 auto;
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
.weather-list-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}
.section-title {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
}
.extra-info-toggle {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #607089;
  font-size: 14px;
  cursor: pointer;
}
.extra-info-toggle input {
  width: auto;
  margin: 0;
}
.weather-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}
.empty-state {
  padding: 64px 20px;
  border: 1px dashed #aebed0;
  border-radius: 22px;
  text-align: center;
  color: #607089;
  background: rgb(255 255 255 / 65%);
}
.empty-state span {
  font-size: 42px;
}
.empty-state h2 {
  margin: 12px 0 6px;
  color: #293b52;
}
.empty-state p {
  margin: 0;
}
@media (max-width: 860px) {
  .weather-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 620px) {
  .weather-page {
    padding: 28px 14px;
  }
  .weather-grid {
    grid-template-columns: 1fr;
  }
  .weather-list-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
