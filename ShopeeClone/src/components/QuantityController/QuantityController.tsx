import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  classNameWrapper = 'ml-10',
  value,
  ...rest
}: Props) {
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let valueInput = Number(event.target.value)
    if (max !== undefined && valueInput > max) {
      valueInput = max
    } else if (valueInput < 1) {
      valueInput = 1
    }
    onType && onType(valueInput)
  }

  const increase = () => {
    let valueIncrease = Number(value) + 1
    if (max !== undefined && valueIncrease > max) {
      valueIncrease = max
    }
    onIncrease && onIncrease(valueIncrease)
  }

  const decrease = () => {
    let valueDecrease = Number(value) - 1
    if (valueDecrease < 1) {
      valueDecrease = 1
    }
    onDecrease && onDecrease(valueDecrease)
  }

  return (
    <div className={'ml-8 flex items-center' + classNameWrapper}>
      <button
        className='flex h-8 w-8 items-center justify-center 
                  rounded-l-sm border border-gray-300 text-gray-600'
        onClick={decrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <InputNumber
        value={value}
        className=''
        classNameError='hidden'
        classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        onChange={handleChangeInput}
        {...rest}
      />
      <button
        className='flex h-8 w-8 items-center justify-center 
                  rounded-r-sm border border-gray-300 text-gray-600'
        onClick={increase}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
