<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

// 1. computed() 예제
const count = ref(0)
const dummy = ref(0)

const getMethodResult = () => {
  console.log('❌ 일반 함수가 실행되었습니다.')
  return count.value * 2
}

const doubleCount = computed(() => {
  console.log('✅ computed가 다시 계산되었습니다.')
  return count.value * 2
})

// 2. 기본 watch() 예제
const currentCity = ref('서울')
const cityWatchLog = ref('아직 도시 변경을 감지하지 않았습니다.')

watch(currentCity, (newValue, oldValue) => {
  cityWatchLog.value = `📍 [${oldValue}]에서 [${newValue}]로 변경되었습니다.`
  console.log(`[날씨 API 요청] ${newValue}의 날씨를 다시 조회합니다.`)
})

// 3. 여러 데이터를 동시에 감시하는 watch() 예제
const selectedCity = ref('서울')
const dateType = ref('오늘')
const multiWatchLog = ref('도시 또는 날짜를 변경해 주세요.')

watch([selectedCity, dateType], ([newCity, newDate], [oldCity, oldDate]) => {
  multiWatchLog.value = `[변경 감지] ${oldCity}(${oldDate}) → ${newCity}(${newDate})`
  console.log(`[통합 API 요청] ${newCity}의 ${newDate} 날씨를 조회합니다.`)
})

// 4. ref 객체를 감시하는 Deep Watch 예제
const user = ref({
  name: '홍길동',
  age: 20,
})

const deepWatchLog = ref('아직 사용자 정보 변경을 감지하지 않았습니다.')
const ageWatchLog = ref('아직 나이 변경을 감지하지 않았습니다.')

watch(
  user,
  (newValue) => {
    deepWatchLog.value = `[deep 감지] 현재 이름: ${newValue.name}, 나이: ${newValue.age}세`
  },
  { deep: true },
)

watch(
  () => user.value.age,
  (newAge, oldAge) => {
    ageWatchLog.value = `[나이 감지] ${oldAge}세 → ${newAge}세로 변경되었습니다.`
  },
)

// 5. watchEffect() 예제
const username = ref('홍길동')
const watchEffectAge = ref(20)
const watchEffectLog = ref('')

watchEffect(() => {
  watchEffectLog.value = `[자동 감지] 이름: ${username.value} / 나이: ${watchEffectAge.value}세`
  console.log('watchEffect가 실행되었습니다.')
})
</script>

<template>
  <main class="challenge-page">
    <h1>Computed & Watchers Code Challenge</h1>

    <section class="practice-section">
      <h2>1. computed() 캐싱 비교</h2>
      <p>count: {{ count }} / dummy: {{ dummy }}</p>
      <button type="button" @click="count++">count 증가</button>
      <button type="button" @click="dummy++">dummy 증가</button>
      <p>일반 함수 결과: {{ getMethodResult() }}</p>
      <p>Computed 결과: {{ doubleCount }}</p>
      <small>개발자 도구 Console에서 함수와 computed의 실행 횟수를 비교합니다.</small>
    </section>

    <section class="practice-section">
      <h2>2. 기본 watch()</h2>
      <p>현재 선택된 도시: {{ currentCity }}</p>
      <button type="button" @click="currentCity = '서울'">서울</button>
      <button type="button" @click="currentCity = '수원'">수원</button>
      <button type="button" @click="currentCity = '부산'">부산</button>
      <p class="monitor">{{ cityWatchLog }}</p>
    </section>

    <section class="practice-section">
      <h2>3. Multi-Source Watch</h2>
      <label>
        도시:
        <select v-model="selectedCity">
          <option value="서울">서울</option>
          <option value="수원">수원</option>
          <option value="부산">부산</option>
        </select>
      </label>

      <fieldset>
        <legend>날짜</legend>
        <label><input v-model="dateType" type="radio" value="오늘" /> 오늘</label>
        <label><input v-model="dateType" type="radio" value="내일" /> 내일</label>
        <label><input v-model="dateType" type="radio" value="주간예보" /> 주간예보</label>
      </fieldset>

      <p class="monitor">{{ multiWatchLog }}</p>
    </section>

    <section class="practice-section">
      <h2>4. ref 객체 Deep Watch</h2>
      <p>이름: {{ user.name }} / 나이: {{ user.age }}세</p>
      <button type="button" @click="user.name = '이순신'">이름 변경</button>
      <button type="button" @click="user.age++">나이 증가</button>
      <p class="monitor">{{ deepWatchLog }}</p>
      <p class="monitor target">{{ ageWatchLog }}</p>
    </section>

    <section class="practice-section">
      <h2>5. watchEffect()</h2>
      <p>이름: {{ username }} / 나이: {{ watchEffectAge }}세</p>
      <button type="button" @click="username = '이순신'">이름 변경</button>
      <button type="button" @click="watchEffectAge++">나이 증가</button>
      <p class="monitor">{{ watchEffectLog }}</p>
      <small>watchEffect는 컴포넌트가 생성될 때도 한 번 즉시 실행됩니다.</small>
    </section>
  </main>
</template>

<style scoped>
.challenge-page {
  width: min(960px, 100%);
  margin: 0 auto;
  padding: 40px 20px;
  color: #1f2937;
}

.practice-section {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #d8dee8;
  border-radius: 12px;
  background: white;
}

button,
select {
  margin: 4px;
  padding: 8px 12px;
}

button {
  border: 0;
  border-radius: 7px;
  color: white;
  background: #4f46e5;
  cursor: pointer;
}

fieldset {
  margin-top: 12px;
  border: 1px solid #d8dee8;
  border-radius: 8px;
}

.monitor {
  margin-top: 14px;
  padding: 12px;
  border-left: 4px solid #4f46e5;
  background: #eef2ff;
}

.target {
  border-left-color: #059669;
  background: #ecfdf5;
}
</style>
