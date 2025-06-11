import React from 'react'
import HeroSection from './components/HeroSection'
import Category from './components/category'
import TrendingProducts from './components/TrendingProducts'

const page = () => {
  return (
    <div className='bg-white'>
      <HeroSection />
      <Category />
      <TrendingProducts />
      
    </div>
  )
}

export default page

