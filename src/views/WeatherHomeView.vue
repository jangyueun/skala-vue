<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import { getFineDustText, weatherData } from '../data/weather'
import { useConfigStore } from '../stores/configStore'

const router = useRouter()
const configStore = useConfigStore()
const weatherList = ref(weatherData)
const searchQuery = ref('')
const selectedCity = ref(null)
const showExtraInfo = ref(true)
const isLoading = ref(false)
const isSearching = ref(false)
const apiMessage = ref('')

const cityQueries = [
  { id: 'city_01', query: 'Seoul', name: '서울', icon: '☀️' },
  { id: 'city_02', query: 'Suwon', name: '수원', icon: '🌧️' },
  { id: 'city_03', query: 'Busan', name: '부산', icon: '☁️' },
  { id: 'city_04', query: 'Jeju', name: '제주', icon: '🌬️' },
  { id: 'city_05', query: 'Daejeon', name: '대전', icon: '🔥' },
]

const getWeatherIcon = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) return '⛈️'
  if (weatherId >= 300 && weatherId < 600) return '🌧️'
  if (weatherId >= 600 && weatherId < 700) return '❄️'
  if (weatherId >= 700 && weatherId < 800) return '🌫️'
  if (weatherId === 800) return '☀️'
  return '☁️'
}

const fetchFineDust = async (lat, lon, apiKey) => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {
    params: { lat, lon, appid: apiKey },
  })
  return getFineDustText(response.data.list[0].components.pm2_5)
}

const searchCity = async () => {
  const keyword = searchQuery.value.trim()
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

  if (!keyword) return
  if (!apiKey) {
    apiMessage.value = '도시를 검색하려면 OpenWeatherMap API 키가 필요합니다.'
    return
  }

  isSearching.value = true
  apiMessage.value = ''

  try {
    const locationResponse = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
      params: { q: keyword, limit: 1, appid: apiKey },
    })
    const location = locationResponse.data[0]

    if (!location) {
      apiMessage.value = `'${keyword}'에 해당하는 도시를 찾지 못했습니다.`
      return
    }

    const weatherResponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat: location.lat,
          lon: location.lon,
          appid: apiKey,
          units: 'metric',
          lang: 'kr',
        },
      },
    )
    const raw = weatherResponse.data
    const fineDust = await fetchFineDust(location.lat, location.lon, apiKey)
    const searchedWeather = {
      id: `search_${location.lat}_${location.lon}`,
      name: location.local_names?.ko || location.name,
      country: location.country,
      state: location.state || '',
      lat: location.lat,
      lon: location.lon,
      temp: Math.round(raw.main.temp),
      status: raw.weather[0].description,
      icon: getWeatherIcon(raw.weather[0].id),
      humidity: raw.main.humidity,
      wind: raw.wind.speed,
      fineDust,
    }

    weatherList.value = [
      searchedWeather,
      ...weatherList.value.filter((item) => item.id !== searchedWeather.id),
    ]
    searchQuery.value = searchedWeather.name
    selectedCity.value = searchedWeather
    apiMessage.value = `${searchedWeather.name}(${searchedWeather.country})의 실시간 날씨를 불러왔습니다.`
  } catch (error) {
    console.error('도시 검색 실패:', error)
    apiMessage.value = '도시 검색에 실패했습니다. 도시 이름을 다시 확인해 주세요.'
  } finally {
    isSearching.value = false
  }
}

const fetchWeatherList = async () => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (!apiKey) {
    apiMessage.value = 'API 키가 없어 학습용 Mock Data를 표시합니다.'
    return
  }

  isLoading.value = true
  apiMessage.value = ''

  try {
    const requests = cityQueries.map((city) =>
      axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: { q: city.query, appid: apiKey, units: 'metric', lang: 'kr' },
      }),
    )
    const responses = await axios.all(requests)

    const weatherRequests = responses.map(async (response, index) => {
      const raw = response.data
      const city = cityQueries[index]
      const fineDust = await fetchFineDust(raw.coord.lat, raw.coord.lon, apiKey)
      return {
        id: city.id,
        name: city.name,
        temp: Math.round(raw.main.temp),
        status: raw.weather[0].description,
        icon: city.icon,
        humidity: raw.main.humidity,
        wind: raw.wind.speed,
        fineDust,
      }
    })
    weatherList.value = await Promise.all(weatherRequests)
    apiMessage.value = 'OpenWeatherMap 실시간 데이터입니다.'
  } catch (error) {
    console.error('날씨 API 호출 실패:', error)
    apiMessage.value = 'API 호출에 실패해 Mock Data를 표시합니다.'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchWeatherList)

const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()
  if (!keyword) return weatherList.value
  return weatherList.value.filter((weather) => weather.name.includes(keyword))
})

const averageTemp = computed(() => {
  const total = weatherList.value.reduce((sum, weather) => sum + weather.temp, 0)
  const averageCelsius = total / weatherList.value.length

  if (configStore.unit === 'fahrenheit') {
    return ((averageCelsius * 9) / 5 + 32).toFixed(1)
  }
  return averageCelsius.toFixed(1)
})

const statusMessage = computed(() =>
  selectedCity.value
    ? `${selectedCity.value.name}이(가) 선택되었습니다.`
    : '지역별 날씨 카드를 선택해 주세요.',
)

const goToDetail = (weather) => {
  if (weather.lat !== undefined && weather.lon !== undefined) {
    router.push({
      path: `/weather/${weather.id}`,
      query: {
        lat: weather.lat,
        lon: weather.lon,
        name: weather.name,
        country: weather.country,
      },
    })
    return
  }
  router.push(`/weather/${weather.id}`)
}
</script>

<template>
  <main class="weather-page">
    <section class="weather-dashboard">
      <header class="dashboard-header">
        <div>
          <p class="eyebrow">WEATHER MEETS DRAMA</p>
          <h1>오늘 날씨엔,<br /><em>이 드라마</em></h1>
          <p class="hero-description">
            지역별 날씨를 확인하고 지금의 분위기에 어울리는 한국 드라마를 추천받아 보세요.
          </p>
        </div>
        <div class="average-temperature">
          <span>전체 평균 기온</span>
          <strong>{{ averageTemp }}{{ configStore.unitSymbol }}</strong>
        </div>
      </header>

      <BaseDashboardCard>
        <SearchBar
          :search-query="searchQuery"
          :is-searching="isSearching"
          @update-query="searchQuery = $event"
          @search-city="searchCity"
        />
      </BaseDashboardCard>

      <p class="status-bar">{{ statusMessage }}</p>
      <el-alert v-if="apiMessage" :title="apiMessage" type="info" :closable="false" show-icon />

      <BaseDashboardCard>
        <div class="list-heading">
          <div>
            <p class="list-label">CITY COLLECTION</p>
            <h2>지역별 날씨와 추천 장르</h2>
          </div>
          <label><input v-model="showExtraInfo" type="checkbox" /> 추가 정보 표시</label>
        </div>

        <el-skeleton v-if="isLoading" :rows="5" animated />

        <section v-else-if="filteredWeatherList.length" class="weather-grid">
          <WeatherCard
            v-for="weather in filteredWeatherList"
            :key="weather.id"
            :weather="weather"
            :show-extra-info="showExtraInfo"
            @select-card="selectedCity = $event"
            @click-detail="goToDetail"
          />
        </section>

        <el-empty v-else description="검색 결과가 없습니다." />
      </BaseDashboardCard>
    </section>
  </main>
</template>

<style scoped>
.weather-page {
  min-height: calc(100vh - 70px);
  padding: 44px 20px;
  color: #392b31;
  background:
    radial-gradient(circle at 12% 0%, rgb(203 138 103 / 18%), transparent 30%),
    linear-gradient(180deg, #fffaf5, #f4eee9);
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
  color: #a3543c;
  font-weight: 800;
  letter-spacing: 0.14em;
}
h1 {
  margin: 0;
  font-size: clamp(30px, 5vw, 48px);
}
h1 em {
  color: #6f293a;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 500;
}
.hero-description {
  max-width: 560px;
  margin: 14px 0 0;
  color: #786d72;
  line-height: 1.7;
}
.average-temperature {
  min-width: 170px;
  padding: 18px 20px;
  border-radius: 18px;
  border: 1px solid #eadfd7;
  background: #fffdfb;
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
  border-left: 4px solid #a3543c;
  border-radius: 4px 12px 12px 4px;
  color: #6f293a;
  background: #f5e9e2;
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
.list-label {
  margin: 0 0 3px;
  color: #a3543c;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
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
