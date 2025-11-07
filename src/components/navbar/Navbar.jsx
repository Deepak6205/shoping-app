import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar'

const Navbar = () => {
    const navList = (
    <ul className='flex space-x-3 text-white font-medium text-md px-5'>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/allProduct"}>All Product</Link>
      </li>
      <li>
        <Link to={"/signup"}>signup</Link>
      </li>
      <li>
        <Link to={"/"}>User</Link>
      </li>
      {/* admin */}
      {/* <li>
        <Link to={"/"}>Admin</Link>
      </li>
      <li>
        Logout
      </li> */}

      {/* cart */}
      <li>
        <Link to={"/cart"}>Cart(0)</Link>
      </li>
    </ul>
    )
  return (
    <nav className='bg-pink-600 stick top-0'>
        {/*  Main */}
    <div className='lg:flex lg:justify-between items-center py-3 lg:px-3'>
        {/* left */}
        <div className='left py-3 lg:py-0'>
            <Link to={"/"} >
                <h2 className='font-bold text-white text-2xl text-center'>Your-BaaZaar</h2>
            </Link>
        </div>
        {/* right */}
        <div className='right flex justify-center mb-4 lg:mb-0'>
            {navList}
        </div>
        {/* searchbar */}
        <SearchBar />
    </div>
    </nav>
    
  )
}

export default Navbar