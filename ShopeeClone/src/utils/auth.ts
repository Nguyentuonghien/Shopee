// các function để tt vs local storage

import { User } from 'src/types/user.type'

export const saveAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLocalStorage = () => localStorage.getItem('access_token') || ''

export const getProfileUserFromLocalStorage = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const saveProfileToLocalStorage = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const clearAccessTokenAndProfileFromLocalStorage = () => {
  localStorage.removeItem('access_token')
}
