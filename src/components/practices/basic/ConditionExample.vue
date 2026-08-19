<script setup>
import { ref } from 'vue'

const isLogged = ref(false)
const score = ref(85)
const isVisible = ref(true)
</script>

<template>
  <section class="practice-section">
    <h2>v-if / v-else-if / v-else / v-show</h2>

    <p v-if="isLogged">환영합니다! 회원 전용 화면입니다.</p>
    <p v-else>로그인이 필요합니다.</p>
    <button @click="isLogged = !isLogged">
      {{ isLogged ? '로그아웃 하기' : '로그인 하기' }}
    </button>

    <h3>점수별 결과</h3>
    <input v-model="score" type="number" min="0" max="100" step="5" />
    <p v-if="score >= 90" class="grade-a">A 학점</p>
    <p v-else-if="score >= 80" class="grade-b">B 학점</p>
    <p v-else-if="score >= 70" class="grade-c">C 학점</p>
    <p v-else class="grade-f">F 학점</p>

    <h3>v-show</h3>
    <button @click="isVisible = !isVisible">상자 표시 토글</button>
    <div v-show="isVisible" class="box">이 태그는 사라지지 않고 CSS로 숨겨집니다.</div>
  </section>
</template>

<style scoped>
.practice-section {
  margin: 24px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button,
input {
  margin: 4px;
  padding: 8px;
}

.grade-a {
  color: green;
}
.grade-b {
  color: blue;
}
.grade-c {
  color: orange;
}
.grade-f {
  color: red;
}

.box {
  margin-top: 8px;
  padding: 12px;
  color: white;
  background: #3498db;
  border-radius: 5px;
}
</style>
