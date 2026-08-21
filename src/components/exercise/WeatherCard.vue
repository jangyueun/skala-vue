<script setup>
const props = defineProps({
  weather: { type: Object, required: true },
  showExtraInfo: { type: Boolean, default: true },
})

const emit = defineEmits(['select-card', 'click-detail'])
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
        <p class="city-name">{{ weather.name }}</p>
        <p class="weather-status">{{ weather.status }}</p>
      </div>
      <span class="weather-icon">{{ weather.icon }}</span>
    </div>

    <p class="temperature">{{ weather.temp }}<span>℃</span></p>
    <p :class="['temperature-label', weather.temp >= 25 ? 'hot' : 'cool']">
      {{ weather.temp >= 25 ? '🔥 더움 (25도 이상)' : '❄️ 선선함 (25도 미만)' }}
    </p>

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

    <button type="button" @click.stop="emit('click-detail', props.weather)">상세보기</button>
  </article>
</template>

<style scoped>
.weather-card {
  padding: 22px;
  border: 1px solid #c1d0e0;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 16px 38px rgb(36 76 116 / 10%);
  cursor: pointer;
  transition: 180ms ease;
}
.weather-card:hover,
.weather-card:focus-visible {
  border-color: #6ea6df;
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
}
.temperature span {
  color: #718097;
  font-size: 22px;
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
dt {
  color: #718097;
  font-size: 11px;
}
dd {
  margin: 3px 0 0;
  font-size: 13px;
  font-weight: 750;
}
button {
  width: 100%;
  padding: 11px 14px;
  border: 0;
  border-radius: 11px;
  color: white;
  background: #2874c6;
  font-weight: 750;
  cursor: pointer;
}
</style>
