<script setup>
defineProps({
  dramas: { type: Array, required: true },
  genre: { type: String, required: true },
  mood: { type: String, required: true },
})

const getPosterUrl = (posterPath) => {
  if (!posterPath) return ''
  return `https://image.tmdb.org/t/p/w500${posterPath}`
}
</script>

<template>
  <section class="recommendation-section">
    <header class="recommendation-header">
      <div>
        <p class="section-label">WEATHER PICK</p>
        <h2>오늘은 {{ genre }} 어때요?</h2>
        <p>{{ mood }}</p>
      </div>
      <el-tag type="warning" size="large" round>{{ genre }}</el-tag>
    </header>

    <div class="drama-grid">
      <article v-for="drama in dramas" :key="drama.id" class="drama-card">
        <div class="poster-wrap">
          <img
            v-if="drama.poster_path"
            :src="getPosterUrl(drama.poster_path)"
            :alt="`${drama.name} 포스터`"
          />
          <div v-else class="poster-placeholder">
            <span>DRAMA</span>
            <strong>{{ drama.name }}</strong>
          </div>
        </div>
        <div class="drama-content">
          <div class="drama-title-row">
            <h3>{{ drama.name }}</h3>
            <span>★ {{ drama.vote_average ? drama.vote_average.toFixed(1) : '정보 없음' }}</span>
          </div>
          <p>{{ drama.overview || '등록된 줄거리 정보가 없습니다.' }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.recommendation-section {
  margin-top: 28px;
  padding-top: 28px;
  border-top: 1px solid #e9ded6;
}
.recommendation-header,
.drama-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.section-label {
  margin: 0 0 6px;
  color: #a3543c;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.15em;
}
h2,
h3,
.recommendation-header > div > p:last-child {
  margin: 0;
}
h2 {
  color: #302b35;
  font-size: 25px;
}
.recommendation-header > div > p:last-child {
  margin-top: 7px;
  color: #786d72;
}
.drama-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 20px;
}
.drama-card {
  overflow: hidden;
  border: 1px solid #eadfd7;
  border-radius: 18px;
  background: #fffdfb;
}
.poster-wrap {
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background: #efe7df;
}
.poster-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 24%;
}
.poster-placeholder {
  display: grid;
  place-content: center;
  height: 100%;
  padding: 20px;
  color: #fff8ef;
  text-align: center;
  background: linear-gradient(135deg, #6f293a, #bb6b4d);
}
.poster-placeholder span {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.25em;
}
.poster-placeholder strong {
  margin-top: 7px;
  font-size: 18px;
}
.drama-content {
  padding: 15px;
}
.drama-title-row h3 {
  color: #302b35;
  font-size: 17px;
}
.drama-title-row span {
  flex: 0 0 auto;
  color: #a3543c;
  font-size: 12px;
  font-weight: 700;
}
.drama-content p {
  display: -webkit-box;
  overflow: hidden;
  margin: 10px 0 0;
  color: #786d72;
  font-size: 13px;
  line-height: 1.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
@media (max-width: 720px) {
  .drama-grid {
    grid-template-columns: 1fr;
  }
  .drama-card {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
  .poster-wrap {
    height: 100%;
    aspect-ratio: auto;
  }
}
</style>
