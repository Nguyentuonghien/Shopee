import productApi from 'src/api/product.api'
import AsideFilter from './AsideFilter'
import Products from './Products'
import SortProductList from './SortProductList'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from 'src/hooks/useQueryParams'

export default function ProductList() {
  // test api:
  const queryParams = useQueryParams()

  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })

  // console.log('data: ', data)

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {/* generic 30 products */}
              {data &&
                data?.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Products product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
