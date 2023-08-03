import React, { forwardRef, InputHTMLAttributes } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = 'gray-300 w-full rounded-sm border border p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    // khi user gõ số thì onChange mới chạy còn gõ text thì không
    if (/^\d+$/.test(value) || value === '') {
      onChange && onChange(event)
    }
  }

  return (
    <div className={className}>
      <input onChange={handleChange} className={classNameInput} {...rest} ref={ref}></input>
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
