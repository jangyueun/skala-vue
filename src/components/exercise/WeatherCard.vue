<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore'
import { getDramaRecommendation } from '../../data/dramas'

const props = defineProps({
  weather: { type: Object, required: true },
  showExtraInfo: { type: Boolean, default: true },
})

const emit = defineEmits(['select-card', 'click-detail'])
const configStore = useConfigStore()
const dramaRecommendation = computed(() =>
  getDramaRecommendation(props.weather.status, props.weather.temp),
)

const displayTemp = computed(() => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((props.weather.temp * 9) / 5 + 32)
  }
  return props.weather.temp
})
</script>

<template>
  <article
    class="weather-card"
    tabindex="0"
    @click="emit('select-card', props.weather)"
    @keyup.enter="emit('select-card', props.weather)"
  >
    <div class="card-heading">
      <div>
        <p class="city-name">
          {{ weather.name }}<small v-if="weather.country"> · {{ weather.country }}</small>
        </p>
        <p class="weather-status">{{ weather.status }}</p>
      </div>
      <span class="weather-icon">{{ weather.icon }}</span>
    </div>

    <p class="temperature">
      {{ displayTemp }}<span>{{ configStore.unitSymbol }}</span>
    </p>
    <div class="temperature-label">
      <el-tag :type="weather.temp >= 25 ? 'danger' : 'primary'" round>
        {{ weather.temp >= 25 ? '🔥 더움 (25도 이상)' : '❄️ 선선함 (25도 미만)' }}
      </el-tag>
    </div>

    <div class="drama-preview">
      <span>오늘의 장르</span>
      <strong>🎬 {{ dramaRecommendation.genre }}</strong>
      <small>{{ dramaRecommendation.mood }}</small>
    </div>

    <dl v-if="showExtraInfo" class="weather-details">
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

    <el-button
      class="detail-button"
      type="primary"
      @click.stop="emit('click-detail', props.weather)"
    >
      날씨와 추천작 보기
    </el-button>
  </article>
</template>

<style scoped>
.weather-card {
  padding: 22px;
  border: 1px solid #eadfd7;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 16px 38px rgb(86 45 47 / 8%);
  cursor: pointer;
  transition: 180ms ease;
}
.weather-card:hover,
.weather-card:focus-visible {
  border-color: #bd745d;
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
.city-name small {
  color: #9a8581;
  font-size: 13px;
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
}
.temperature span {
  color: #718097;
  font-size: 22px;
}
.drama-preview {
  display: grid;
  gap: 3px;
  margin-bottom: 18px;
  padding: 13px 14px;
  border-left: 3px solid #a3543c;
  border-radius: 4px 12px 12px 4px;
  background: #fbf3ed;
}
.drama-preview span {
  color: #9a796d;
  font-size: 11px;
  font-weight: 700;
}
.drama-preview strong {
  color: #5d2938;
}
.drama-preview small {
  color: #786d72;
  line-height: 1.45;
}
.temperature-label {
  display: inline-block;
  margin: 0 0 18px;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 750;
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
  background: #f8f5f2;
}
dt {
  color: #718097;
  font-size: 11px;
}
dd {
  margin: 3px 0 0;
  font-size: 13px;
  font-weight: 750;
}
.detail-button {
  width: 100%;
}
:deep(.el-button--primary) {
  border-color: #6f293a;
  background: #6f293a;
}
:deep(.el-button--primary:hover) {
  border-color: #8d4352;
  background: #8d4352;
}
</style>
