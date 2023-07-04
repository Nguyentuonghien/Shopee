import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'

export function isAxiosErrors<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

// check xem có phải là AxiosError 422 (UnprocessableEntity) không?
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosErrors(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
