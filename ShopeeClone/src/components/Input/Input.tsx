import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // type: React.HTMLInputTypeAttribute
  // placeholder: string
  // errorMessage?: string
  // className?: string
  // register: UseFormRegister<any>
  // name: string
  // rules?: RegisterOptions
  // autoComplete?: string

  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  rules,
  autoComplete,
  classNameInput = 'gray-300 w-full rounded-sm border border p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600'
}: Props) {
  // nếu có register, name -> lấy ra name, rules còn không return object rỗng
  const registerResult = register && name ? register(name, rules) : {}

  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={classNameInput}
        // {...register(name, rules)}
        {...registerResult}
      ></input>
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
