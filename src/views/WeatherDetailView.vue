<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import DramaRecommendation from '../components/exercise/DramaRecommendation.vue'
import { getFineDustText, weatherData } from '../data/weather'
import { getDramaRecommendation, getMockDramas } from '../data/dramas'
import { useConfigStore } from '../stores/configStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const weather = ref(null)
const forecast = ref([])
const recommendedDramas = ref([])
const isLoading = ref(false)
const isDramaLoading = ref(false)
const apiMessage = ref('')
const dramaMessage = ref('')

const cityMapping = {
  city_01: 'Seoul',
  city_02: 'Suwon',
  city_03: 'Busan',
  city_04: 'Jeju',
  city_05: 'Daejeon',
}

const displayTemp = computed(() => {
  if (!weather.value) return 0
  if (configStore.unit === 'fahrenheit') {
    return Math.round((weather.value.temp * 9) / 5 + 32)
  }
  return weather.value.temp
})

const dramaRecommendation = computed(() => {
  if (!weather.value) return getDramaRecommendation('', 20)
  return getDramaRecommendation(weather.value.status, weather.value.temp)
})

const convertTemp = (temp) => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32)
  }
  return Math.round(temp)
}

const fetchDramas = async () => {
  const tmdbToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN
  const recommendation = dramaRecommendation.value

  if (!tmdbToken) {
    recommendedDramas.value = getMockDramas(recommendation.genreId)
    dramaMessage.value = 'TMDB 토큰이 없어 학습용 추천 데이터를 표시합니다.'
    return
  }

  isDramaLoading.value = true
  dramaMessage.value = ''

  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
      headers: { Authorization: `Bearer ${tmdbToken}` },
      params: {
        language: 'ko-KR',
        with_origin_country: 'KR',
        with_genres: recommendation.genreId,
        sort_by: 'popularity.desc',
        page: 1,
      },
    })
    recommendedDramas.value = response.data.results.slice(0, 3)
    dramaMessage.value = 'TMDB에서 현재 날씨와 어울리는 한국 드라마를 골랐습니다.'
  } catch (error) {
    console.error('드라마 API 호출 실패:', error)
    recommendedDramas.value = getMockDramas(recommendation.genreId)
    dramaMessage.value = 'API 호출에 실패해 학습용 추천 데이터를 표시합니다.'
  } finally {
    isDramaLoading.value = false
  }
}

const fetchWeather = async (cityId) => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  const cityName = cityMapping[cityId]
  const latitude = route.query.lat
  const longitude = route.query.lon
  const weatherParams = latitude && longitude
    ? { lat: latitude, lon: longitude }
    : { q: cityName }

  if (!apiKey || (!cityName && (!latitude || !longitude))) {
    apiMessage.value = '학습용 날씨 데이터를 기준으로 추천합니다.'
    return
  }

  isLoading.value = true

  try {
    const currentResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { ...weatherParams, appid: apiKey, units: 'metric', lang: 'kr' },
    })
    const raw = currentResponse.data
    const [forecastResponse, airPollutionResponse] = await axios.all([
      axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: { ...weatherParams, appid: apiKey, units: 'metric', lang: 'kr', cnt: 3 },
      }),
      axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {
        params: { lat: raw.coord.lat, lon: raw.coord.lon, appid: apiKey },
      }),
    ])

    weather.value = {
      ...weather.value,
      temp: Math.round(raw.main.temp),
      status: raw.weather[0].description,
      humidity: raw.main.humidity,
      wind: raw.wind.speed,
      fineDust: getFineDustText(airPollutionResponse.data.list[0].components.pm2_5),
    }
    forecast.value = forecastResponse.data.list
    apiMessage.value = 'OpenWeatherMap 실시간 날씨를 기준으로 추천합니다.'
  } catch (error) {
    console.error('상세 날씨 API 호출 실패:', error)
    apiMessage.value = 'API 호출에 실패해 학습용 날씨 데이터를 기준으로 추천합니다.'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  const cityId = route.params.cityId
  weather.value = weatherData.find((item) => item.id === cityId) ?? null
  if (!weather.value && route.query.lat && route.query.lon) {
    weather.value = {
      id: cityId,
      name: route.query.name || '검색한 도시',
      country: route.query.country || '',
      temp: 0,
      status: '날씨 조회 중',
      icon: '🌍',
      humidity: '-',
      wind: '-',
      fineDust: '조회 중',
    }
  }
  if (!weather.value) return

  await fetchWeather(cityId)
  await fetchDramas()
})
</script>

<template>
  <main class="detail-page">
    <section v-if="weather" class="detail-container">
      <button class="back-button" type="button" @click="router.push('/')">← 추천 목록</button>

      <div class="weather-hero">
        <div>
          <p class="label">TODAY IN {{ weather.name }}</p>
          <h1>{{ weather.name }}의 {{ weather.status }} 날</h1>
          <p class="intro">이 날씨의 온도와 분위기를 기준으로 오늘의 드라마를 골랐어요.</p>
        </div>
        <div class="temperature-block">
          <span>{{ weather.icon }}</span>
          <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
        </div>
      </div>

      <dl>
        <div><dt>습도</dt><dd>{{ weather.humidity }}%</dd></div>
        <div><dt>풍속</dt><dd>{{ weather.wind }}m/s</dd></div>
        <div><dt>미세먼지</dt><dd>{{ weather.fineDust }}</dd></div>
      </dl>

      <p v-if="isLoading" class="source-message">날씨를 불러오는 중입니다...</p>
      <p v-else-if="apiMessage" class="source-message">{{ apiMessage }}</p>

      <div v-if="forecast.length" class="forecast-list">
        <article v-for="item in forecast" :key="item.dt">
          <strong>{{ item.dt_txt.slice(11, 16) }}</strong>
          <span>{{ convertTemp(item.main.temp) }}{{ configStore.unitSymbol }}</span>
          <small>{{ item.weather[0].description }}</small>
        </article>
      </div>

      <el-skeleton v-if="isDramaLoading" :rows="5" animated />
      <DramaRecommendation
        v-else
        :dramas="recommendedDramas"
        :genre="dramaRecommendation.genre"
        :mood="dramaRecommendation.mood"
      />
      <p v-if="dramaMessage" class="source-message drama-source">{{ dramaMessage }}</p>
    </section>

    <section v-else class="empty-card">
      <p>NO SCENE</p>
      <h1>도시 정보를 찾을 수 없습니다.</h1>
      <RouterLink to="/">오늘의 추천으로 돌아가기</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.detail-page {
  min-height: calc(100vh - 70px);
  padding: 42px 20px;
  color: #392b31;
  background: radial-gradient(circle at 85% 0%, rgb(203 138 103 / 17%), transparent 28%), linear-gradient(180deg, #fffaf5, #f4eee9);
}
.detail-container,
.empty-card {
  width: min(1040px, 100%);
  margin: auto;
  padding: 36px;
  border: 1px solid #eadfd7;
  border-radius: 26px;
  background: #fffdfb;
  box-shadow: 0 22px 56px rgb(86 45 47 / 9%);
}
.back-button {
  padding: 8px 0;
  border: 0;
  color: #7a5457;
  background: transparent;
  cursor: pointer;
  font-weight: 700;
}
.weather-hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding: 36px 0 28px;
}
.label {
  margin: 0 0 8px;
  color: #a3543c;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.15em;
}
h1,
.intro { margin: 0; }
h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(34px, 5vw, 54px);
  font-weight: 500;
}
.intro { margin-top: 10px; color: #786d72; }
.temperature-block { display: flex; align-items: center; gap: 12px; flex: 0 0 auto; }
.temperature-block span { font-size: 52px; }
.temperature-block strong { font-size: 48px; }
dl { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 0; }
dl div { padding: 15px; border-radius: 14px; background: #f8f3ef; }
dt { color: #9a8581; font-size: 12px; }
dd { margin: 3px 0 0; font-weight: 800; }
.source-message { margin: 14px 0 0; color: #8b7876; font-size: 12px; }
.drama-source { text-align: right; }
.forecast-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 18px; }
.forecast-list article { display: grid; gap: 3px; padding: 12px; border-radius: 12px; background: #f4ece6; }
.empty-card { margin-top: 80px; text-align: center; }
.empty-card > p { color: #a3543c; font-weight: 800; letter-spacing: 0.16em; }
.empty-card a { display: inline-block; margin-top: 20px; color: #6f293a; font-weight: 700; }
@media (max-width: 700px) {
  .detail-container { padding: 24px; }
  .weather-hero { align-items: flex-start; flex-direction: column; }
  dl,
  .forecast-list { grid-template-columns: 1fr; }
}
</style>
