export const weatherData = [
  {
    id: 'city_01',
    name: '서울',
    temp: 28,
    status: '맑음',
    icon: '☀️',
    humidity: 54,
    wind: 2.1,
    fineDust: '보통',
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 24,
    status: '비',
    icon: '🌧️',
    humidity: 78,
    wind: 3.4,
    fineDust: '좋음',
  },
  {
    id: 'city_03',
    name: '부산',
    temp: 26,
    status: '구름',
    icon: '☁️',
    humidity: 68,
    wind: 4.2,
    fineDust: '보통',
  },
  {
    id: 'city_04',
    name: '제주',
    temp: 23,
    status: '바람',
    icon: '🌬️',
    humidity: 72,
    wind: 6.8,
    fineDust: '좋음',
  },
  {
    id: 'city_05',
    name: '대전',
    temp: 30,
    status: '폭염',
    icon: '🔥',
    humidity: 48,
    wind: 1.5,
    fineDust: '나쁨',
  },
]

export const getFineDustText = (pm25) => {
  const value = Math.round(pm25)

  if (value < 10) return `좋음 (${value}㎍/㎥)`
  if (value < 25) return `양호 (${value}㎍/㎥)`
  if (value < 50) return `보통 (${value}㎍/㎥)`
  if (value < 75) return `나쁨 (${value}㎍/㎥)`
  return `매우 나쁨 (${value}㎍/㎥)`
}
