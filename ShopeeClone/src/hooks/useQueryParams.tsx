import { useSearchParams } from 'react-router-dom'

export default function useQueryParams() {
  // lấy params từ React Route DOM sử dụng hook useSearchParams()
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}
