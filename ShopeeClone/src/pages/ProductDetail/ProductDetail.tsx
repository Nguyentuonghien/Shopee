import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import productApi from 'src/api/product.api'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ProductListConfig } from 'src/types/product.type'
import Products from '../ProductList/Products'
import QuantityController from 'src/components/QuantityController'
import purchaseApi from 'src/api/purchase.api'
import { useQueryClient } from '@tanstack/react-query'
import { PurchaseStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'

export default function ProductDetail() {
  const [buyCount, setBuyCount] = useState(1)

  const queryClient = useQueryClient()

  // lấy nameId từ url sau đó lấy id từ nameId
  // nameId:  Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-i-60afb2c76ef5b902180aacba
  const { nameId } = useParams()
  // console.log('nameId: ', nameId)
  const id = getIdFromNameId(nameId as string)

  const imageRef = useRef<HTMLImageElement>(null)

  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return productApi.getProductDetail(id as string)
    }
  })

  const addToCartMutation = useMutation(purchaseApi.addToCart)

  // api trên trả về 1 object product theo id
  const product = productDetailData?.data.data

  // slider gồm tối đa 5 image của sp -> mảng ban đầu gồm 2 pt 0,5
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  // console.log('currentImages: ', currentImages)

  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }

  // GET
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    // khi product có data thì query mới được gọi
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })
  console.log('productsData: ', productsData)

  const [activeImage, setActiveImage] = useState('')

  // khi có api thì acitve_image là image đầu tiên
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  if (!product) return null

  const chooseActiveImage = (image: string) => {
    setActiveImage(image)
    // console.log('activeImage: ', activeImage)
  }

  const nextImage = () => {
    if (currentIndexImages[1] < product.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prevImage = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()

    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = event.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
    image.style.maxWidth = 'unset'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  // POST
  const addToCart = () => {
    addToCartMutation.mutate(
      { product_id: product._id, buy_count: buyCount },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 2000 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: PurchaseStatus.inCart }] })
        }
      }
    )
  }

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            {/* ảnh hiển thị của sp */}
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                ></img>
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  onClick={prevImage}
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {/* Slider ảnh */}
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    // khi hover vào ảnh nào đó trong slider -> active ảnh đó lên
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActiveImage(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover'
                      ></img>
                      {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                    </div>
                  )
                })}
                <button
                  onClick={nextImage}
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            {/* giới thiệu sp */}
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassname='h-4 w-4 fill-orange text-orange'
                    nonActiveClassname='h-4 w-4 fill-current text-gray-300'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span className=''>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center '>
                <div className='text-gray-500'>Số Lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center '>
                <button
                  onClick={addToCart}
                  // onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-sm border 
                             border-orange bg-orange/10 px-5 capitalize 
                             text-orange shadow-sm hover:bg-orange/5'
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  // onClick={buyNow}
                  className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm 
                             bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* chi tiết sản phẩm */}
      <div className='mt-8'>
        <div className='container'>
          <div className=' bg-white p-4 text-left shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mb-4 mt-12 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* hiển thị các sản phẩm tương tự */}
      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>Có thể bạn cũng thích</div>
          <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {productsData?.data.data.products.map((product) => (
              <div className='col-span-1' key={product._id}>
                <Products product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
