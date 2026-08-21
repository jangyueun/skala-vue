<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { weatherData } from '../data/weather'

const route = useRoute()
const router = useRouter()
const weather = ref(null)

onMounted(() => {
  weather.value = weatherData.find((item) => item.id === route.params.cityId) ?? null
})
</script>

<template>
  <main class="detail-page">
    <section v-if="weather" class="detail-card">
      <span class="icon">{{ weather.icon }}</span>
      <p class="label">{{ route.params.cityId }} 기상관측 정보</p>
      <h1>{{ weather.name }} · {{ weather.status }}</h1>
      <p class="temperature">{{ weather.temp }}℃</p>
      <dl>
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
      <button type="button" @click="router.back()">이전 화면으로</button>
    </section>

    <section v-else class="detail-card">
      <h1>도시 정보를 찾을 수 없습니다.</h1>
      <RouterLink to="/">날씨 대시보드로 돌아가기</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.detail-page {
  min-height: calc(100vh - 70px);
  display: grid;
  place-items: center;
  padding: 32px 20px;
  background: #edf3f9;
  color: #152238;
}
.detail-card {
  width: min(620px, 100%);
  padding: 38px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 20px 50px rgb(36 76 116 / 14%);
  text-align: center;
}
.icon {
  font-size: 72px;
}
.label {
  color: #607089;
}
h1 {
  margin: 8px 0;
}
.temperature {
  margin: 20px 0;
  font-size: 58px;
  font-weight: 800;
}
dl {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
dl div {
  padding: 14px;
  border-radius: 12px;
  background: #f3f7fb;
}
dt {
  color: #718097;
  font-size: 13px;
}
dd {
  margin: 4px 0 0;
  font-weight: 800;
}
button {
  margin-top: 26px;
  padding: 12px 20px;
  border: 0;
  border-radius: 10px;
  color: #fff;
  background: #2874c6;
  cursor: pointer;
}
</style>
