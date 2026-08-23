<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const baseUrl = 'https://jsonplaceholder.typicode.com/posts'
const items = ref([])
const textInput = ref('')

const handleRead = async () => {
  const response = await axios.get(baseUrl, { params: { _limit: 3 } })
  items.value = response.data
}

const handleCreate = async () => {
  if (!textInput.value.trim()) return
  const response = await axios.post(baseUrl, {
    title: textInput.value,
    body: '연습용 내용',
    userId: 1,
  })
  items.value.unshift(response.data)
  textInput.value = ''
}

const handleUpdate = async (id) => {
  const response = await axios.patch(`${baseUrl}/${id}`, { title: '수정된 제목' })
  const target = items.value.find((item) => item.id === id)
  if (target) target.title = response.data.title
}

const handleDelete = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
  items.value = items.value.filter((item) => item.id !== id)
}

onMounted(handleRead)
</script>

<template>
  <section class="practice-section">
    <h2>⚡ Axios CRUD 실습</h2>
    <div class="input-zone">
      <input v-model="textInput" placeholder="저장할 제목" />
      <button type="button" @click="handleCreate">POST</button>
    </div>
    <ul>
      <li v-for="item in items" :key="item.id">
        <span>{{ item.id }}. {{ item.title }}</span>
        <div>
          <button type="button" @click="handleUpdate(item.id)">PATCH</button>
          <button type="button" @click="handleDelete(item.id)">DELETE</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.input-zone,
li {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
ul {
  display: grid;
  gap: 8px;
  padding: 0;
  list-style: none;
}
li {
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
</style>
