<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../../../stores/counter'

const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)
const { increment } = counterStore
</script>

<template>
  <section class="practice-section">
    <h2>Counter Store 활용 실습</h2>
    <p>
      원본 카운트 데이터(state): <strong>{{ count }}</strong>
    </p>
    <p>
      2배 연산 데이터(getters): <strong>{{ doubleCount }}</strong>
    </p>
    <button type="button" @click="increment">숫자 1 증가 (actions)</button>
  </section>
</template>

<style scoped>
.practice-section {
  padding: 20px;
  border: 1px solid #dbe5ef;
  border-radius: 12px;
}
button {
  padding: 8px 12px;
  border: 0;
  border-radius: 8px;
  color: white;
  background: #2874c6;
  cursor: pointer;
}
</style>
