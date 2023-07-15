import Button from 'src/components/Button'

export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        {/* phần tùy chọn */}
        <div className='flex flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <Button className='h-8 bg-orange px-4 text-center text-sm uppercase text-white hover:bg-orange/80'>
            Phổ biến
          </Button>
          <Button className='h-8 bg-white px-4 text-center text-sm uppercase text-black hover:bg-white/80'>
            Mới nhất
          </Button>
          <Button className='h-8 bg-white px-4 text-center text-sm uppercase text-black hover:bg-slate-100'>
            Bán chạy
          </Button>
          <select
            className='h-8 bg-white px-4 text-left text-sm uppercase text-black outline-none hover:bg-slate-100'
            value=''
          >
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: thấp đến cao</option>
            <option value='price:desc'>Giá: Cao đến thấp</option>
          </select>
        </div>

        {/* phần phân trang */}
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <Button className='h-8 cursor-not-allowed rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </Button>
            <Button className='h-8 rounded-br-sm rounded-tr-sm bg-white px-3 shadow hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
