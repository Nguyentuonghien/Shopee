import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'
import { toast } from 'react-toastify'

class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // add 1 response interceptor:
    this.instance.interceptors.response.use(
      function (response) {
        return response
      },
      function (error: AxiosError) {
        // console.log('error: ', error)
        // xử lý các lỗi khác lỗi 422
        if (error.response?.status != HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data // trick
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
