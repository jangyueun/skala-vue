<script setup>
defineProps({
  searchQuery: { type: String, required: true },
})

const emit = defineEmits(['update-query'])
</script>

<template>
  <div>
    <h2>🔍 도시 검색</h2>
    <div class="search-controls">
      <input
        id="city-search"
        type="search"
        :value="searchQuery"
        placeholder="예: 서울, 부산, 제주"
        aria-label="검색할 도시 이름"
        @input="emit('update-query', $event.target.value)"
      />
      <button v-if="searchQuery" type="button" @click="emit('update-query', '')">초기화</button>
    </div>
    <p>
      검색 중인 도시: <strong>{{ searchQuery || '없음' }}</strong>
    </p>
  </div>
</template>

<style scoped>
h2 {
  margin: 0 0 12px;
  font-size: 18px;
}
.search-controls {
  display: flex;
  gap: 10px;
}
input {
  width: 100%;
  padding: 13px 15px;
  border: 1px solid #bfcddd;
  border-radius: 12px;
  outline: none;
}
input:focus {
  border-color: #2874c6;
  box-shadow: 0 0 0 4px rgb(40 116 198 / 12%);
}
button {
  flex: 0 0 auto;
  padding: 0 18px;
  border: 0;
  border-radius: 11px;
  color: #31506f;
  background: #e8eff7;
  cursor: pointer;
}
p {
  margin: 12px 0 0;
  color: #607089;
  font-size: 14px;
}
</style>
