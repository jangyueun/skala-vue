<script setup>
import { ref } from 'vue'

const message = ref('안녕하세요!')
const count = ref(1)
const name = ref('홍길동')
const age = ref(20)
</script>

<template>
  <section v-cloak class="practice-section">
    <h2>v-pre / v-cloak / v-once / v-memo</h2>

    <h3>v-pre</h3>
    <p>일반 출력: {{ message }}</p>
    <p v-pre>v-pre 출력: {{ message }}</p>

    <h3>v-cloak</h3>
    <p>{{ message }} — Vue 로딩 전에는 이 영역이 숨겨집니다.</p>

    <h3>v-once</h3>
    <p>일반 출력: {{ count }}</p>
    <p v-once>최초 값으로 고정: {{ count }}</p>
    <button @click="count++">숫자 증가</button>

    <h3>v-memo</h3>
    <div v-memo="[name]" class="memo-box">
      <p>이름: {{ name }}</p>
      <p>나이: {{ age }} — 이름이 바뀔 때 함께 갱신됩니다.</p>
    </div>
    <button @click="name = name === '홍길동' ? '이순신' : '홍길동'">이름 변경</button>
    <button @click="age++">나이 증가</button>
  </section>
</template>

<style scoped>
[v-cloak] {
  display: none !important;
}

.practice-section {
  margin: 24px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  margin: 4px;
  padding: 8px;
}

.memo-box {
  padding: 12px;
  border: 1px solid #42b883;
}
</style>
