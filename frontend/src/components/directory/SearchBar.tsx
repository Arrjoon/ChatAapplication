import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const SearchBar = () => {
  return (
    <div>

        <Input placeholder="Search businesses..." />
        <Button>Search</Button>
    </div>

  )
}

export default SearchBar