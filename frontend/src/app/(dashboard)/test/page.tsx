import Parent from '@/components/ui/Parent'
import React from 'react'

const Test = () => {
  return (
    <>
    {/* Navbar  */}
    <nav className='bg-white px-6 py-4 flex  justify-between items-center shadow-md'>
        <h1 className='text-2xl font-bold text-blue-600'>My dashbarod </h1>
        <div className='flex items-center space-x-4'>
            <input type='text' className='border rounded px-3 py-3 focus:outline-none focus:ring-blue-200' placeholder='Search ..'/>
            <button className='bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>Login</button>
        </div>
    </nav>

      <div className="flex">
            {/* <!-- Sidebar --> */}
            <aside className="w-64 bg-white shadow-md min-h-screen p-6 space-y-6">
            <h2 className="font-bold text-lg text-gray-700">Menu</h2>
            <ul className="space-y-2">
                <li><a href="#" className="block p-2 rounded hover:bg-blue-100 transition">Dashboard</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-blue-100 transition">Users</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-blue-100 transition">Settings</a></li>
                <li><a href="#" className="block p-2 rounded hover:bg-blue-100 transition">Reports</a></li>
            </ul>
            </aside>
    </div>
    <Parent/>
    </>
  )
}

export default Test