<template>
  <main class="not-found">
    <p>404</p>
    <h1>요청하신 페이지를 찾을 수 없습니다.</h1>
    <RouterLink to="/">홈으로 돌아가기</RouterLink>
  </main>
</template>

<style scoped>
.not-found {
  min-height: calc(100vh - 70px);
  display: grid;
  place-content: center;
  padding: 24px;
  text-align: center;
  color: #152238;
  background: #edf3f9;
}
.not-found p {
  margin: 0;
  color: #2874c6;
  font-size: 72px;
  font-weight: 900;
}
a {
  color: #2874c6;
  font-weight: 700;
}
</style>
