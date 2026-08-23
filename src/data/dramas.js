export const weatherDramaMap = [
  {
    keywords: ['비', '소나기', '이슬비'],
    genre: '감성 드라마',
    genreId: 18,
    mood: '빗소리와 함께 천천히 몰입하기 좋은 이야기',
    accent: 'rainy',
  },
  {
    keywords: ['맑', '해'],
    genre: '기분 좋은 코미디',
    genreId: 35,
    mood: '산뜻한 하루의 기분을 이어갈 유쾌한 이야기',
    accent: 'sunny',
  },
  {
    keywords: ['구름', '흐림', '안개'],
    genre: '미스터리',
    genreId: 9648,
    mood: '흐린 분위기와 잘 어울리는 긴장감 있는 이야기',
    accent: 'cloudy',
  },
  {
    keywords: ['바람'],
    genre: '힐링 드라마',
    genreId: 18,
    mood: '선선한 바람처럼 마음을 편안하게 해 줄 이야기',
    accent: 'windy',
  },
  {
    keywords: ['눈'],
    genre: '판타지',
    genreId: 10765,
    mood: '창밖의 눈처럼 특별한 세계에 빠져드는 이야기',
    accent: 'snowy',
  },
  {
    keywords: ['폭염', '더움'],
    genre: '액션 & 어드벤처',
    genreId: 10759,
    mood: '더위를 잊게 해 줄 빠르고 시원한 이야기',
    accent: 'hot',
  },
]

export const mockDramas = {
  18: [
    { id: 'mock_01', name: '나의 해방일지', overview: '평범한 하루 속에서 작은 해방을 찾아가는 사람들의 이야기', vote_average: 8.2 },
    { id: 'mock_02', name: '우리들의 블루스', overview: '제주를 배경으로 여러 사람의 삶을 따뜻하게 담은 옴니버스 드라마', vote_average: 8.1 },
    { id: 'mock_03', name: '나의 아저씨', overview: '서로의 삶을 견디게 해 주는 두 사람의 깊고 잔잔한 이야기', vote_average: 8.5 },
  ],
  35: [
    { id: 'mock_04', name: '갯마을 차차차', overview: '바닷마을 사람들과 함께 펼쳐지는 밝고 따뜻한 로맨틱 코미디', vote_average: 8.1 },
    { id: 'mock_05', name: '쌈, 마이웨이', overview: '자기만의 길을 찾아가는 청춘들의 유쾌한 성장 이야기', vote_average: 7.9 },
    { id: 'mock_06', name: '사내맞선', overview: '뜻밖의 소개팅에서 시작되는 빠르고 즐거운 로맨틱 코미디', vote_average: 8.0 },
  ],
  9648: [
    { id: 'mock_07', name: '시그널', overview: '과거와 현재를 잇는 무전으로 미제 사건을 추적하는 이야기', vote_average: 8.5 },
    { id: 'mock_08', name: '비밀의 숲', overview: '감정을 잃은 검사와 형사가 사건 뒤의 진실을 파헤치는 이야기', vote_average: 8.4 },
    { id: 'mock_09', name: '악의 꽃', overview: '숨겨진 과거와 진실을 마주하는 부부의 미스터리', vote_average: 8.2 },
  ],
  10765: [
    { id: 'mock_10', name: '도깨비', overview: '불멸의 삶을 끝내기 위해 인간 신부를 기다리는 도깨비의 이야기', vote_average: 8.6 },
    { id: 'mock_11', name: '호텔 델루나', overview: '특별한 손님들이 머무는 호텔에서 펼쳐지는 판타지 이야기', vote_average: 8.2 },
    { id: 'mock_12', name: '환혼', overview: '영혼을 바꾸는 술법을 둘러싼 판타지 로맨스', vote_average: 8.3 },
  ],
  10759: [
    { id: 'mock_13', name: '무빙', overview: '초능력을 숨기고 살아가는 아이들과 부모들의 액션 이야기', vote_average: 8.5 },
    { id: 'mock_14', name: '빈센조', overview: '악당의 방식으로 악당을 상대하는 통쾌한 이야기', vote_average: 8.4 },
    { id: 'mock_15', name: '경이로운 소문', overview: '악귀를 잡는 카운터들의 시원한 팀 액션', vote_average: 8.2 },
  ],
}

export const getDramaRecommendation = (weatherStatus, temperature) => {
  const status = weatherStatus || ''

  // 비와 눈처럼 분위기가 뚜렷한 날씨를 먼저 확인합니다.
  if (status.includes('눈')) return weatherDramaMap[4]
  if (['비', '소나기', '이슬비'].some((keyword) => status.includes(keyword))) {
    return weatherDramaMap[0]
  }

  // 같은 흐림 상태라도 기온이 크게 다르면 다른 장르를 추천합니다.
  if (temperature >= 28) return weatherDramaMap[5]
  if (temperature <= 10) return weatherDramaMap[3]

  const matchedRecommendation = weatherDramaMap.find((recommendation) =>
    recommendation.keywords.some((keyword) => status.includes(keyword)),
  )

  if (matchedRecommendation) return matchedRecommendation
  if (temperature >= 23) return weatherDramaMap[1]
  return weatherDramaMap[0]
}

export const getMockDramas = (genreId) => {
  return mockDramas[genreId] || mockDramas[18]
}
