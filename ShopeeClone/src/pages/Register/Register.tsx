import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getRules } from 'src/utils/rules'
import Input from 'src/components/Input'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  // case không truyền gì vào getRules():  const rules = getRules()
  // case truyền getValues vào getRules()
  const rules = getRules(getValues)

  const onSubmit = handleSubmit(
    (data) => {
      ;('')
    },
    // khi form xử lý không đúng
    (data) => {
      const password = getValues('password')
    }
  )

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Ký</div>

              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                name='email'
                rules={rules.email}
                register={register}
                errorMessage={errors.email?.message}
                autoComplete='on'
              />

              <Input
                className='mt-2'
                type='password'
                placeholder='Password'
                name='password'
                rules={rules.password}
                register={register}
                errorMessage={errors.password?.message}
                autoComplete='on'
              />

              <Input
                className='mt-2'
                type='password'
                placeholder='Confirm Password'
                name='confirm_password'
                rules={rules.confirm_password}
                register={register}
                errorMessage={errors.confirm_password?.message}
                autoComplete='on'
              />

              <div className='mt-2'>
                <button
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
                  type='submit'
                >
                  Đăng Ký
                </button>
              </div>
              <div className='mt-8'>
                <div className='flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                  <Link className='ml-1 text-red-400' to='/login'>
                    Đăng Nhập
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
