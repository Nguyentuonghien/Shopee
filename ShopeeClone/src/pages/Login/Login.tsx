import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/api/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/errors'
import { ErrorResponseApi } from 'src/types/utils.type'
import Input from 'src/components/Input'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'

type FormData = Pick<Schema, 'email' | 'password'>

// với login thì schema không cần có confirm password -> omit
// có thể dùng pick -> ngược lại với omit
// const loginSchema = schema.omit(['confirm_password'])

const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log('data trả về thành công: ', data)
        // login thành công -> set setIsAuthenticated, profile cho user -> navigate sang trang product list
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        // nếu là lỗi 422, formError(không undefied) có email, password
        // lấy giá trị error trong reresponse ứng vs email, password hiển thị lỗi trên form
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>

              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                errorMessage={errors.email?.message}
                autoComplete='on'
                // rules={rules.email}
              />

              <Input
                className='mt-2'
                type='password'
                placeholder='Password'
                name='password'
                register={register}
                errorMessage={errors.password?.message}
                autoComplete='on'
                // rules={rules.password}
              />
              <div className='mt-2'>
                <Button
                  isLoading={loginAccountMutation.isLoading}
                  // khi đang login -> button sẽ bị disabled và không spam ấn được
                  disabled={loginAccountMutation.isLoading}
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
                  type='submit'
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className='mt-8'>
                <div className='flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                  <Link className='ml-1 text-red-400' to='/register'>
                    Đăng Ký
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
