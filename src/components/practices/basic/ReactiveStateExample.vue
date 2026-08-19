<script setup>
import { reactive, ref } from 'vue'

// ref() 실습 데이터
const count = ref(0)
const name = ref('홍길동')
const isActive = ref(true)
const refItems = ref(['사과', '배'])
const refUser = ref({
  name: '이순신',
  age: 30,
})

const increaseRef = () => {
  count.value++
}

const changeRefUserName = () => {
  refUser.value.name = '장보고'
}

// reactive() 실습 데이터
const reactiveUser = reactive({
  name: '이순신',
  age: 30,
})

const reactiveItems = reactive(['사과', '바나나'])

const celebrateReactive = () => {
  reactiveUser.age++
}

const addReactiveItem = () => {
  reactiveItems.push(`과일 ${reactiveItems.length + 1}`)
}

const removeReactiveItem = (index) => {
  reactiveItems.splice(index, 1)
}
</script>

<template>
  <main class="reactive-page">
    <section class="reactive-dashboard">
      <header class="challenge-header">
        <p>COMPOSITION API</p>
        <h1>Reactive State Code Challenge</h1>
        <span>ref()와 reactive()의 사용 방법을 직접 비교합니다.</span>
      </header>

      <div class="example-grid">
        <section class="example-card">
          <h2>1. 반응형 상태 ref()</h2>
          <p class="concept">
            <code>ref</code>는 모든 자료형을 반응형으로 만들며 JavaScript에서는
            <code>.value</code>를 사용합니다.
          </p>

          <div class="example-row">
            <span>Ref 카운트</span>
            <strong>{{ count }}</strong>
            <button type="button" @click="increaseRef">1 증가</button>
          </div>

          <label class="input-row">
            <span>이름</span>
            <input v-model="name" type="text" />
          </label>
          <p class="result">입력한 이름: {{ name }}</p>

          <div class="example-row">
            <span>활성 상태</span>
            <strong :class="{ active: isActive }">{{ isActive ? '활성' : '비활성' }}</strong>
            <button type="button" @click="isActive = !isActive">토글</button>
          </div>

          <div class="list-section">
            <p>
              과일 목록: <strong>{{ refItems.join(', ') }}</strong>
            </p>
            <button type="button" @click="refItems.push('귤')">귤 추가</button>
          </div>

          <div class="user-section">
            <p>사용자: {{ refUser.name }} / {{ refUser.age }}세</p>
            <button type="button" @click="changeRefUserName">이름을 장보고로 변경</button>
          </div>
        </section>

        <section class="example-card">
          <h2>2. 반응형 상태 reactive()</h2>
          <p class="concept">
            <code>reactive</code>는 객체와 배열을 반응형으로 만들며 <code>.value</code> 없이
            접근합니다.
          </p>

          <div class="user-section">
            <h3>객체(Object)</h3>
            <p>이름: {{ reactiveUser.name }} / 나이: {{ reactiveUser.age }}세</p>
            <button type="button" @click="celebrateReactive">나이 한 살 추가</button>
          </div>

          <div class="list-section">
            <h3>배열(Array)</h3>
            <ul>
              <li v-for="(item, index) in reactiveItems" :key="`${item}-${index}`">
                <span>{{ item }}</span>
                <button type="button" class="remove-button" @click="removeReactiveItem(index)">
                  삭제
                </button>
              </li>
            </ul>
            <button type="button" @click="addReactiveItem">과일 항목 추가</button>
          </div>
        </section>
      </div>

      <section class="comparison">
        <h2>ref와 reactive 비교</h2>
        <div class="comparison-grid">
          <div><strong>ref</strong><span>모든 값 사용 가능</span><code>count.value++</code></div>
          <div><strong>reactive</strong><span>객체·배열에 사용</span><code>user.age++</code></div>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.reactive-page {
  padding: 56px 20px;
  color: #172033;
  background: #f7f8fc;
}

.reactive-dashboard {
  width: min(1120px, 100%);
  margin: 0 auto;
}

.challenge-header {
  margin-bottom: 24px;
}

.challenge-header p {
  margin: 0 0 6px;
  color: #6c5ce7;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.challenge-header h1 {
  margin: 0;
  font-size: clamp(28px, 4vw, 42px);
}

.challenge-header span {
  display: block;
  margin-top: 8px;
  color: #667085;
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.example-card,
.comparison {
  padding: 24px;
  border: 1px solid #e1e5ee;
  border-radius: 18px;
  background: white;
  box-shadow: 0 12px 30px rgb(31 42 68 / 7%);
}

.example-card h2,
.comparison h2 {
  margin: 0 0 12px;
}

.concept {
  min-height: 48px;
  color: #667085;
}

code {
  padding: 2px 5px;
  border-radius: 5px;
  color: #5b4bc4;
  background: #f0edff;
}

.example-row,
.input-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid #edf0f5;
}

.input-row {
  grid-template-columns: 100px 1fr;
}

input {
  width: 100%;
  padding: 9px 11px;
  border: 1px solid #cdd4df;
  border-radius: 8px;
}

button {
  padding: 8px 12px;
  border: 0;
  border-radius: 8px;
  color: white;
  background: #6c5ce7;
  cursor: pointer;
}

button:hover {
  background: #5748c7;
}

.active {
  color: #178f59;
}

.result,
.list-section,
.user-section {
  margin: 14px 0 0;
}

.list-section ul {
  padding: 0;
  list-style: none;
}

.list-section li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
  padding: 9px 10px;
  border-radius: 8px;
  background: #f7f8fb;
}

.remove-button {
  color: #b42318;
  background: #fee4e2;
}

.remove-button:hover {
  background: #fecdca;
}

.comparison {
  margin-top: 20px;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.comparison-grid div {
  display: grid;
  gap: 6px;
  padding: 16px;
  border-radius: 12px;
  background: #f7f8fb;
}

.comparison-grid span {
  color: #667085;
}

@media (max-width: 760px) {
  .example-grid,
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>
