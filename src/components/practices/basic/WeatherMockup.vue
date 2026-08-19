<script setup>
import { computed, ref } from 'vue'

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

const searchCity = ref('')
const selectedMessage = ref('지역별 날씨 카드를 선택해 주세요.')

const filteredWeatherList = computed(() => {
  const keyword = searchCity.value.trim()
  if (!keyword) return weatherList.value
  return weatherList.value.filter((weather) => weather.name.includes(keyword))
})

const averageTemp = computed(() => {
  const total = weatherList.value.reduce((sum, weather) => sum + weather.temp, 0)
  return (total / weatherList.value.length).toFixed(1)
})

const handleSearchInput = (event) => {
  searchCity.value = event.target.value
}

const selectCity = (cityName) => {
  selectedMessage.value = `${cityName}이(가) 선택되었습니다.`
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

const clearSearch = () => {
  searchCity.value = ''
}
</script>

<template>
  <main class="weather-page">
    <section class="weather-dashboard">
      <header class="dashboard-header">
        <div>
          <h1>🌤️ 과제 1: 날씨 (Mockup)</h1>
        </div>
        <div class="average-temperature">
          <span>전체 평균 기온</span>
          <strong>{{ averageTemp }}℃</strong>
        </div>
      </header>

      <section class="search-section" aria-label="도시 검색">
        <h2 class="section-title">🔍 도시 검색</h2>
        <label class="visually-hidden" for="city-search">검색할 도시 이름</label>
        <div class="search-controls">
          <input
            id="city-search"
            type="search"
            :value="searchCity"
            @input="handleSearchInput"
            placeholder="예: 서울, 부산, 제주"
          />
          <button v-if="searchCity" type="button" class="clear-button" @click="clearSearch">
            초기화
          </button>
        </div>
        <p class="search-result">
          검색 중인 도시: <strong>{{ searchCity || '없음' }}</strong>
        </p>
      </section>

      <p class="status-bar" aria-live="polite">{{ selectedMessage }}</p>

      <h2 class="section-title weather-list-title">🏙️ 지역별 날씨 현황</h2>

      <section v-if="filteredWeatherList.length" class="weather-grid" aria-label="지역별 날씨 목록">
        <article
          v-for="weather in filteredWeatherList"
          :key="weather.id"
          class="weather-card"
          tabindex="0"
          @click="selectCity(weather.name)"
          @keyup.enter="selectCity(weather.name)"
        >
          <div class="card-heading">
            <div>
              <p class="city-name">{{ weather.name }}</p>
              <p class="weather-status">{{ weather.status }}</p>
            </div>
            <span class="weather-icon" aria-hidden="true">{{ weather.icon }}</span>
          </div>

          <p class="temperature">{{ weather.temp }}<span>℃</span></p>
          <p v-if="weather.temp >= 25" class="temperature-label hot">🔥 더움 (25도 이상)</p>
          <p v-else class="temperature-label cool">❄️ 선선함 (25도 미만)</p>

          <dl class="weather-details">
            <div>
              <dt>습도</dt>
              <dd>{{ weather.humidity }}%</dd>
            </div>
            <div>
              <dt>풍속</dt>
              <dd>{{ weather.wind }}m/s</dd>
            </div>
            <div>
              <dt>미세먼지</dt>
              <dd>{{ weather.fineDust }}</dd>
            </div>
          </dl>

          <button
            type="button"
            class="detail-button"
            @click.stop="showDetail(weather.name, weather.status)"
          >
            상세보기
          </button>
        </article>
      </section>

      <section v-else class="empty-state">
        <span aria-hidden="true">🔍</span>
        <h2>검색 결과가 없습니다.</h2>
        <p>다른 도시 이름을 입력해 보세요.</p>
      </section>
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
  width: min(1120px, 100%);
  margin: 0 auto;
}
.dashboard-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}
h1 {
  margin: 0;
  font-size: clamp(30px, 5vw, 48px);
  line-height: 1.1;
}
.section-title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 800;
}
.weather-list-title {
  margin-top: 22px;
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.average-temperature {
  min-width: 170px;
  padding: 18px 20px;
  border: 1px solid rgb(40 116 198 / 18%);
  border-radius: 18px;
  background: rgb(255 255 255 / 78%);
  box-shadow: 0 14px 34px rgb(36 76 116 / 10%);
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
.search-section {
  padding: 22px;
  border: 1px solid rgb(255 255 255 / 72%);
  border-radius: 20px;
  background: rgb(255 255 255 / 82%);
  box-shadow: 0 18px 46px rgb(36 76 116 / 10%);
}
.search-section label {
  display: block;
  margin-bottom: 8px;
  font-weight: 700;
}
.search-controls {
  display: flex;
  gap: 10px;
}
.search-controls input {
  width: 100%;
  padding: 13px 15px;
  border: 1px solid #bfcddd;
  border-radius: 12px;
  color: #152238;
  background: white;
  outline: none;
}
.search-controls input:focus {
  border-color: #2874c6;
  box-shadow: 0 0 0 4px rgb(40 116 198 / 12%);
}
.clear-button,
.detail-button {
  border: 0;
  border-radius: 11px;
  cursor: pointer;
}
.clear-button {
  flex: 0 0 auto;
  padding: 0 18px;
  color: #31506f;
  background: #e8eff7;
}
.search-result {
  margin: 12px 0 0;
  color: #607089;
  font-size: 14px;
}
.status-bar {
  margin: 20px 0;
  padding: 14px 18px;
  border-left: 4px solid #2874c6;
  border-radius: 4px 12px 12px 4px;
  color: #1d4f83;
  background: #dcecff;
  font-weight: 700;
}
.weather-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}
.weather-card {
  padding: 22px;
  border: 1px solid rgb(193 208 224 / 78%);
  border-radius: 22px;
  background: rgb(255 255 255 / 90%);
  box-shadow: 0 16px 38px rgb(36 76 116 / 10%);
  cursor: pointer;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}
.weather-card:hover,
.weather-card:focus-visible {
  border-color: #6ea6df;
  box-shadow: 0 20px 46px rgb(36 76 116 / 17%);
  transform: translateY(-4px);
  outline: none;
}
.card-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.city-name,
.weather-status {
  margin: 0;
}
.city-name {
  font-size: 22px;
  font-weight: 800;
}
.weather-status {
  margin-top: 4px;
  color: #718097;
}
.weather-icon {
  font-size: 42px;
}
.temperature {
  margin: 24px 0 12px;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -0.04em;
}
.temperature span {
  margin-left: 3px;
  color: #718097;
  font-size: 22px;
  font-weight: 600;
}
.temperature-label {
  display: inline-block;
  margin: 0 0 18px;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 750;
}
.hot {
  color: #a74422;
  background: #ffeadf;
}
.cool {
  color: #25618f;
  background: #e0f2ff;
}
.weather-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 0 0 18px;
}
.weather-details div {
  padding: 10px 6px;
  border-radius: 10px;
  text-align: center;
  background: #f4f7fa;
}
.weather-details dt {
  color: #718097;
  font-size: 11px;
}
.weather-details dd {
  margin: 3px 0 0;
  font-size: 13px;
  font-weight: 750;
}
.detail-button {
  width: 100%;
  padding: 11px 14px;
  color: white;
  background: #2874c6;
  font-weight: 750;
}
.detail-button:hover {
  background: #1e61a8;
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
  .dashboard-header {
    align-items: stretch;
    flex-direction: column;
  }
  .weather-grid {
    grid-template-columns: 1fr;
  }
  .average-temperature {
    min-width: 0;
  }
}
</style>
