<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const userForm = ref({ email: '', agree: false })
const productQuantity = ref(1)
const productRate = ref(4)
const downloadProgress = ref(0)
const isDownloading = ref(false)

const handleRegister = () => {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('올바른 이메일 형식이 아닙니다.')
    return
  }
  if (!userForm.value.agree) {
    ElMessage.warning('이용약관에 동의해 주세요.')
    return
  }
  ElMessage.success('가입 신청이 완료되었습니다.')
}

const confirmDelete = async () => {
  try {
    await ElMessageBox.confirm('파일을 영구히 삭제하시겠습니까?', '최종 확인', {
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      type: 'warning',
    })
    ElMessage.success('파일이 삭제되었습니다.')
  } catch {
    ElMessage.info('삭제를 취소했습니다.')
  }
}

const startDownload = () => {
  if (isDownloading.value) return
  isDownloading.value = true
  downloadProgress.value = 0

  const interval = setInterval(() => {
    downloadProgress.value += 20
    if (downloadProgress.value >= 100) {
      clearInterval(interval)
      isDownloading.value = false
      ElMessage.success('데이터 동기화가 완료되었습니다.')
    }
  }, 400)
}
</script>

<template>
  <section class="practice-section">
    <h2>Element Plus 활용 실습</h2>

    <el-card>
      <template #header><strong>회원가입 Form</strong></template>
      <div class="card-body">
        <el-input v-model="userForm.email" placeholder="example@email.com" clearable />
        <el-switch v-model="userForm.agree" active-text="이용약관 동의" />
        <el-button type="success" @click="handleRegister">회원가입</el-button>
      </div>
    </el-card>

    <el-card>
      <template #header><strong>상품 수량과 별점</strong></template>
      <div class="card-body">
        <el-input-number v-model="productQuantity" :min="1" :max="10" />
        <el-rate v-model="productRate" show-score />
        <p>수량 {{ productQuantity }}개 / 평점 {{ productRate }}점</p>
      </div>
    </el-card>

    <el-card>
      <template #header><strong>시스템 피드백</strong></template>
      <div class="card-body">
        <div>
          <el-button type="danger" plain @click="confirmDelete">파일 삭제</el-button>
          <el-button type="primary" :loading="isDownloading" @click="startDownload">
            데이터 동기화
          </el-button>
        </div>
        <el-progress :percentage="downloadProgress" />
      </div>
    </el-card>
  </section>
</template>

<style scoped>
.practice-section,
.card-body {
  display: grid;
  gap: 16px;
}
.practice-section {
  width: min(820px, 100%);
}
</style>
