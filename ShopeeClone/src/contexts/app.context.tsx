import { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLocalStorage, getProfileUserFromLocalStorage } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

// giá trị khởi tạo ban đầu
const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()), // lấy ra từ local storage, nếu local storage có access-token -> true và ngược lại
  setIsAuthenticated: () => null,
  profile: getProfileUserFromLocalStorage(),
  setProfile: () => null
}

// createContext() -> truyền giá trị khởi tạo initialAppContext
// nếu không truyền value vào Provider ->  initialAppContext này sẽ được sử dụng
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // khi login thành công -> set lại quyền và profile cho user
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
