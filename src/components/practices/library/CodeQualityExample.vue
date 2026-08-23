<script setup>
const myRegion = 'Suwon'
const regionGreeting = `웰컴 투 ${myRegion}`
const userAge = 20
const apiUrl = import.meta.env.VITE_API_URL

if (userAge === 20) {
  console.log(regionGreeting)
}
</script>

<template>
  <section>
    <h2>코드 품질관리 실습</h2>
    <p>{{ regionGreeting }}</p>
    <p>API URL: {{ apiUrl }}</p>
  </section>
</template>
