<template>
  <main class="info-page">
    <section>
      <p>ABOUT</p>
      <h1>날씨 서비스 소개</h1>
      <p>
        Vue 3의 반응형 상태, 컴포넌트, Props·Emits와 Vue Router를 학습하기 위해 만든 지역별 날씨
        Mockup입니다.
      </p>
      <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.info-page {
  min-height: calc(100vh - 70px);
  display: grid;
  place-items: center;
  padding: 24px;
  background: #edf3f9;
  color: #152238;
}
section {
  width: min(680px, 100%);
  padding: 40px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 20px 50px rgb(36 76 116 / 12%);
}
section > p:first-child {
  color: #2874c6;
  font-weight: 800;
  letter-spacing: 0.14em;
}
a {
  display: inline-block;
  margin-top: 20px;
  color: #2874c6;
  font-weight: 700;
}
</style>
