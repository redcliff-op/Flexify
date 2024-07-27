import { Text, Image, Pressable } from 'react-native'
import React from 'react'
import { useStore } from '@/src/store/store'

interface MealCategoryCardProps {
  category: MealCategory
}

const MealCategoryCard = ({ category }: MealCategoryCardProps) => {

  const {fetchCat} = useStore((state)=>({
    fetchCat: state.fetchCat
  }))

  return (
    <Pressable
      onPress={()=>{
        fetchCat(category.strCategory)
      }}
      className=' justify-center items-center m-1.5 flex-1 rounded-3xl bg-darkgray p-5'>
      <Image
        className=' rounded-full w-[150] h-[100]'
        source={{ uri: category.strCategoryThumb }}
      />
      <Text className='mt-2 text-white text-base font-bold'>{category.strCategory}</Text>
      <Text numberOfLines={3} className='mt-2 text-gray-300 text-base'>{category.strCategoryDescription}</Text>
    </Pressable>
  )
}

export default MealCategoryCard