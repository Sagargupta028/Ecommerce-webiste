import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainCarosel from '../../components/HomeCarosel/MainCarosel'
import HomeSectionCarosel from '../../components/HomeSectionCarosel/HomeSectionCarosel'
import { findProducts } from '../../../State/Product/Action'
import { api } from '../../../config/apiConfig'

const HomePage = () => {
  const dispatch = useDispatch()
  const [categoryProducts, setCategoryProducts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllCategoriesAndProducts = async () => {
      setLoading(true)
      const categoryData = {}

      try {
        // First, fetch all level 3 categories (the specific product categories)
        const categoriesResponse = await api.get('/api/categories/level/3')
        const categories = categoriesResponse.data || []
        
        console.log('Fetched categories:', categories)

        // Then fetch products for each category
        for (const category of categories) {
          try {
            const response = await api.get(`/api/products?category=${encodeURIComponent(category.name)}&pageSize=10`)
            categoryData[category.name] = response.data.content || []
          } catch (error) {
            console.error(`Error fetching products for ${category.name}:`, error)
            categoryData[category.name] = []
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }

      setCategoryProducts(categoryData)
      setLoading(false)
    }

    fetchAllCategoriesAndProducts()
  }, [])

  if (loading) {
    return (
      <div>
        <MainCarosel/>
        <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <MainCarosel/>
      <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
        {Object.keys(categoryProducts).map((category) => {
          const products = categoryProducts[category] || []
          
          if (products.length === 0) {
            return (
              <div key={category} className="relative px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-extrabold text-gray-900 py-5">{category}</h2>
                <div className="relative border p-5 text-center py-10">
                  <p className="text-gray-500">No products added in this category yet</p>
                </div>
              </div>
            )
          }

          return (
            <HomeSectionCarosel 
              key={category}
              data={products} 
              sectionName={category}
            />
          )
        })}
      </div>
    </div>
  )
}

export default HomePage
