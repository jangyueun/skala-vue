<script setup>
defineProps({
  averageTemp: {
    type: String,
    required: true,
  },
  hotCityCount: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <header class="dashboard-header">
    <h1>🌤️ 과제 1: 날씨 (Mockup)</h1>
    <div class="average-temperature">
      <span>전체 평균 기온</span>
      <strong>{{ averageTemp }}℃</strong>
      <small>더운 도시 {{ hotCityCount }}곳</small>
    </div>
  </header>
</template>

<style scoped>
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
.average-temperature {
  min-width: 170px;
  padding: 18px 20px;
  border: 1px solid rgb(40 116 198 / 18%);
  border-radius: 18px;
  background: rgb(255 255 255 / 78%);
  box-shadow: 0 14px 34px rgb(36 76 116 / 10%);
}
.average-temperature span,
.average-temperature strong,
.average-temperature small {
  display: block;
}
.average-temperature span,
.average-temperature small {
  color: #607089;
}
.average-temperature span {
  font-size: 13px;
}
.average-temperature strong {
  margin-top: 4px;
  font-size: 28px;
}
.average-temperature small {
  margin-top: 2px;
}
@media (max-width: 620px) {
  .dashboard-header {
    align-items: stretch;
    flex-direction: column;
  }
  .average-temperature {
    min-width: 0;
  }
}
</style>
