import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

interface Props {
  product: Product
}

export default function Products({ product }: Props) {
  return (
    <div>
      <Link to=''>
        <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
          {/* Ảnh */}
          <div className='relative w-full pt-[100%]'>
            <img
              alt={product.name}
              src={product.image}
              className='absolute left-0 top-0 h-full w-full bg-white object-cover'
            ></img>
          </div>
          {/* title */}
          <div className='overflow-hidden p-2'>
            <div className='min-h-[2rem] text-xs uppercase line-clamp-2'>{product.name}</div>
          </div>
          {/* Giá */}
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              {formatCurrency(product.price_before_discount)}
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span className=''>{formatCurrency(product.price)}</span>
            </div>
          </div>
          {/* Sao đánh giá và tình trạng sp */}
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />
            {/* tình trạng sp */}
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
