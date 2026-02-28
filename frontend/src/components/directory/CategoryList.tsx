import React from 'react'

const categories = [
    "Restaurants",
    "Cafes",
    "Shopping",
    "Entertainment",
    "Health",
    "Education",
    "Services",
    "Travel",
    "Accommodation",
    "Nightlife"

]

const CategoryList = () => {
  return (
    categories.map((category) => (
        <div key={category}>{category}</div>
    ))
  )
}

export default CategoryList