import productApi from 'src/api/product.api'
import AsideFilter from './AsideFilter'
import Products from './Products'
import SortProductList from './SortProductList'
import { useQuery } from '@tanstack/react-query'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import categoryApi from 'src/api/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

export default function ProductList() {
  const queryConfig = useQueryConfig() // sử dụng hook useQueryConfig() đã được custom

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true, // chuyển trang
    staleTime: 3 * 60 * 1000
  })
  // console.log('productsData: ', productsData)

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  // console.log('categoriesData: ', categoriesData)

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter categories={categoriesData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              {/* generic 30 products */}
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData?.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Products product={product} />
                  </div>
                ))}
              </div>
              {/* phân trang */}
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
