<script setup>
import StoreCounter from '../components/practices/library/StoreCounter.vue'
import AxiosWeather from '../components/practices/library/AxiosWeather.vue'
import AxiosJson from '../components/practices/library/AxiosJson.vue'
import ElementPlus from '../components/practices/library/ElementPlus.vue'
import CodeQualityExample from '../components/practices/library/CodeQualityExample.vue'
</script>

<template>
  <main class="practice-page">
    <header>
      <p>CODE CHALLENGE</p>
      <h1>라이브러리 실습 모음</h1>
    </header>
    <StoreCounter />
    <AxiosWeather />
    <AxiosJson />
    <ElementPlus />
    <CodeQualityExample />
  </main>
</template>

<style scoped>
.practice-page {
  display: grid;
  gap: 32px;
  width: min(920px, calc(100% - 32px));
  margin: 40px auto;
  color: #152238;
}
header p {
  color: #2874c6;
  font-weight: 800;
  letter-spacing: 0.14em;
}
</style>
