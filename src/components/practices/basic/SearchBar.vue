<script setup>
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])

const handleInput = (event) => {
  emit('update-query', event.target.value)
}

const clearSearch = () => {
  emit('update-query', '')
}
</script>

<template>
  <div>
    <h2 class="section-title">🔍 도시 검색</h2>
    <label class="visually-hidden" for="city-search">검색할 도시 이름</label>
    <div class="search-controls">
      <input
        id="city-search"
        type="search"
        :value="searchQuery"
        placeholder="예: 서울, 부산, 제주"
        @input="handleInput"
      />
      <button v-if="searchQuery" type="button" class="clear-button" @click="clearSearch">
        초기화
      </button>
    </div>
    <p class="search-result">
      검색 중인 도시: <strong>{{ searchQuery || '없음' }}</strong>
    </p>
  </div>
</template>

<style scoped>
.section-title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 800;
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.search-controls {
  display: flex;
  gap: 10px;
}
.search-controls input {
  width: 100%;
  padding: 13px 15px;
  border: 1px solid #bfcddd;
  border-radius: 12px;
  color: #152238;
  background: white;
  outline: none;
}
.search-controls input:focus {
  border-color: #2874c6;
  box-shadow: 0 0 0 4px rgb(40 116 198 / 12%);
}
.clear-button {
  flex: 0 0 auto;
  padding: 0 18px;
  border: 0;
  border-radius: 11px;
  color: #31506f;
  background: #e8eff7;
  cursor: pointer;
}
.search-result {
  margin: 12px 0 0;
  color: #607089;
  font-size: 14px;
}
</style>
