import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import {
  clearAccessTokenAndProfileFromLocalStorage,
  getAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
  saveProfileToLocalStorage
} from './auth'
import constPath from 'src/constants/path'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    // giá trị khởi tạo = access_token trong local storage
    this.accessToken = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // // add a request interceptor (api mà cần header token truyền lên)
    this.instance.interceptors.request.use(
      (config) => {
        // nếu có accessToken -> gán và header
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // add a response interceptor for response
    this.instance.interceptors.response.use(
      (response) => {
        // console.log('response: ', response)
        const { url } = response.config
        // gán cho acccess_token lấy ra từ response sau khi login/register -> lưu vào local storage
        // còn logout thì acccess_token remove đó ra
        if (url === constPath.login || url === constPath.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          console.log('accessToken trả về: ', this.accessToken)
          saveAccessTokenToLocalStorage(this.accessToken)
          saveProfileToLocalStorage(data.data.user)
        } else if (url === constPath.logout) {
          this.accessToken = ''
          clearAccessTokenAndProfileFromLocalStorage()
        }
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
