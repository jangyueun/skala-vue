<script setup>
import { ref } from 'vue'

const fruits = ref(['사과', '바나나', '딸기'])
const user = ref({
  name: '홍길동',
  age: 25,
  role: '개발자',
})
const items = ref([
  { id: 'prod_101', name: '아이폰' },
  { id: 'prod_102', name: '갤럭시' },
])
</script>

<template>
  <section class="practice-section">
    <h2>v-for</h2>

    <h3>배열 반복</h3>
    <ul>
      <li v-for="(fruit, index) in fruits" :key="fruit">{{ index + 1 }}번 과일: {{ fruit }}</li>
    </ul>

    <h3>객체 반복</h3>
    <ul>
      <li v-for="(value, key, index) in user" :key="key">[{{ index }}] {{ key }}: {{ value }}</li>
    </ul>

    <h3>객체 배열 반복</h3>
    <ul>
      <li v-for="(item, index) in items" :key="item.id">[{{ index }}] {{ item.name }}</li>
    </ul>
  </section>
</template>

<style scoped>
.practice-section {
  margin: 24px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
