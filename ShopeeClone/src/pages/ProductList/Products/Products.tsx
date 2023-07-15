import { Link } from 'react-router-dom'

export default function Products() {
  return (
    <div>
      <Link to=''>
        <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
          {/* Ảnh */}
          <div className='relative w-full pt-[100%]'>
            <img
              alt=''
              src='https://cf.shopee.vn/file/ea0f159f3f4c713abcf56b5ba73840b9_tn'
              className='absolute left-0 top-0 h-full w-full bg-white object-cover'
            ></img>
          </div>
          {/* title */}
          <div className='overflow-hidden p-2'>
            <div className='min-h-[2rem] text-xs uppercase line-clamp-2'>
              [HÀNG HIỆU] Thắt lưng da nam khóa tự động cao cấp dây nịt nam mặt xoay chính hãng phong cách nhật bản cực
              đẹp - vvmh3
            </div>
          </div>
          {/* Giá */}
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>₫7.000</div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span className=''>5.000</span>
            </div>
          </div>
          {/* Sao đánh giá và tình trạng sp */}
          <div className='mt-3 flex items-center justify-end'>
            {/* sao đánh giá */}
            <div className='flex items-center'>
              <div className='relative'>
                {/* sao màu vàng */}
                <div className='absolute left-0 top-0 h-full overflow-hidden' style={{ width: '50%' }}>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='h-3 w-3 fill-yellow-300 text-yellow-300'
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                    />
                  </svg>
                </div>
                {/* sao màu xám */}
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className={'h-3 w-3 fill-current text-gray-300'}
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
            </div>
            {/* tình trạng sp */}
            <div className='ml-2 text-sm'>
              <span>5.66k</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
