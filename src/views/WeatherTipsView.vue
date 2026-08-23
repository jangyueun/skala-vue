<script setup>
import { weatherDramaMap } from '../data/dramas'
</script>

<template>
  <main class="guide-page">
    <section class="guide-container">
      <header>
        <p>OUR CURATION RULE</p>
        <h1>날씨를 장르로 번역하는 법</h1>
        <span>어려운 추천 알고리즘 대신 날씨의 분위기와 어울리는 장르를 정했어요.</span>
      </header>

      <div class="rule-grid">
        <article v-for="item in weatherDramaMap" :key="item.genre">
          <div class="weather-keywords">
            <span v-for="keyword in item.keywords" :key="keyword">#{{ keyword }}</span>
          </div>
          <h2>{{ item.genre }}</h2>
          <p>{{ item.mood }}</p>
        </article>
      </div>

      <RouterLink to="/">오늘의 드라마 찾기 →</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.guide-page {
  min-height: calc(100vh - 70px);
  padding: 56px 20px;
  color: #392b31;
  background: linear-gradient(180deg, #fffaf5, #f4eee9);
}
.guide-container { width: min(1040px, 100%); margin: auto; }
header { max-width: 680px; }
header p { margin: 0 0 8px; color: #a3543c; font-size: 12px; font-weight: 800; letter-spacing: 0.15em; }
h1 { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(34px, 5vw, 52px); font-weight: 500; }
header span { display: block; margin-top: 12px; color: #786d72; }
.rule-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 34px; }
article { min-height: 190px; padding: 22px; border: 1px solid #eadfd7; border-radius: 20px; background: #fffdfb; box-shadow: 0 14px 34px rgb(86 45 47 / 6%); }
.weather-keywords { display: flex; flex-wrap: wrap; gap: 6px; }
.weather-keywords span { padding: 4px 8px; border-radius: 999px; color: #8a503f; background: #f5e9e2; font-size: 11px; }
h2 { margin: 24px 0 7px; font-size: 21px; }
article p { margin: 0; color: #786d72; line-height: 1.65; }
a { display: inline-block; margin-top: 26px; color: #6f293a; font-weight: 800; text-decoration: none; }
@media (max-width: 760px) { .rule-grid { grid-template-columns: 1fr; } }
</style>
