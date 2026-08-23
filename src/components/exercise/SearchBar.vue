<script setup>
defineProps({
  searchQuery: { type: String, required: true },
  isSearching: { type: Boolean, default: false },
})

const emit = defineEmits(['update-query', 'search-city'])
</script>

<template>
  <div>
    <p class="label">FIND YOUR CITY</p>
    <h2>어느 도시의 장면을 볼까요?</h2>
    <div class="search-controls">
      <input
        id="city-search"
        type="search"
        :value="searchQuery"
        placeholder="국내·해외 도시를 입력하세요. 예: 제주, Tokyo, Paris"
        aria-label="검색할 도시 이름"
        @input="emit('update-query', $event.target.value)"
        @keyup.enter="emit('search-city')"
      />
      <button
        class="search-button"
        type="button"
        :disabled="!searchQuery.trim() || isSearching"
        @click="emit('search-city')"
      >
        {{ isSearching ? '검색 중' : '도시 검색' }}
      </button>
      <button v-if="searchQuery" type="button" @click="emit('update-query', '')">초기화</button>
    </div>
    <p>
      현재 검색어: <strong>{{ searchQuery || '전체 도시' }}</strong>
    </p>
  </div>
</template>

<style scoped>
h2 {
  margin: 0 0 12px;
  font-size: 18px;
}
.label {
  margin: 0 0 4px;
  color: #a3543c;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
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
  border-color: #a3543c;
  box-shadow: 0 0 0 4px rgb(163 84 60 / 11%);
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
.search-button {
  color: #fff;
  background: #6f293a;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
p {
  margin: 12px 0 0;
  color: #607089;
  font-size: 14px;
}
</style>
