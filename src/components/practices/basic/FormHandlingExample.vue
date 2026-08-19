<script setup>
import { ref } from 'vue'

const userName = ref('')
const comment = ref('')
const isAgreed = ref(false)
const favoriteFruits = ref([])
const gender = ref('')
const selectedCar = ref('')

const lazyText = ref('')
const age = ref('')
const userEmail = ref('')
const price = ref('')
</script>

<template>
  <section class="practice-section">
    <h2>Vue Form Handling</h2>

    <h3>1. 일반 입력창</h3>
    <input v-model="userName" type="text" placeholder="이름을 입력하세요" />
    <p>입력한 이름: {{ userName }}</p>

    <h3>2. Textarea</h3>
    <textarea v-model="comment" placeholder="의견을 입력하세요"></textarea>
    <p>입력한 의견: {{ comment }}</p>

    <h3>3. 단일 Checkbox</h3>
    <label>
      <input v-model="isAgreed" type="checkbox" />
      약관에 동의합니다.
    </label>
    <p>동의 여부: {{ isAgreed }}</p>

    <h3>4. 다중 Checkbox</h3>
    <label><input v-model="favoriteFruits" type="checkbox" value="사과" /> 사과</label>
    <label><input v-model="favoriteFruits" type="checkbox" value="바나나" /> 바나나</label>
    <label><input v-model="favoriteFruits" type="checkbox" value="딸기" /> 딸기</label>
    <p>좋아하는 과일: {{ favoriteFruits }}</p>

    <h3>5. Radio</h3>
    <label><input v-model="gender" type="radio" value="남성" /> 남성</label>
    <label><input v-model="gender" type="radio" value="여성" /> 여성</label>
    <p>선택한 성별: {{ gender }}</p>

    <h3>6. Select</h3>
    <select v-model="selectedCar">
      <option value="">선택하세요</option>
      <option value="tesla">테슬라</option>
      <option value="hyundai">현대자동차</option>
      <option value="bmw">BMW</option>
    </select>
    <p>선택한 자동차: {{ selectedCar }}</p>

    <h2>v-model 수식어</h2>

    <h3>7. .lazy</h3>
    <input v-model.lazy="lazyText" type="text" placeholder="입력 후 다른 곳을 클릭하세요" />
    <p>확정된 값: {{ lazyText }}</p>

    <h3>8. .number</h3>
    <input v-model.number="age" type="text" placeholder="나이를 입력하세요" />
    <p>입력한 나이: {{ age }}</p>
    <p>자료형: {{ typeof age }}</p>

    <h3>9. .trim</h3>
    <input v-model.trim="userEmail" type="text" placeholder="앞뒤 공백을 포함해 입력하세요" />
    <p>이메일: "{{ userEmail }}"</p>
    <p>문자열 길이: {{ userEmail.length }}</p>

    <h3>10. .trim.number 체이닝</h3>
    <input v-model.trim.number="price" type="text" placeholder="공백이 있는 숫자를 입력하세요" />
    <p>처리된 값: "{{ price }}"</p>
    <p>자료형: {{ typeof price }}</p>
  </section>
</template>

<style scoped>
.practice-section {
  margin: 24px 0;
  padding: 20px;
  border: 1px solid #cccccc;
  border-radius: 8px;
}

input,
textarea,
select {
  margin: 4px;
  padding: 8px;
}
</style>
