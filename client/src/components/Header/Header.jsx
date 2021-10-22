import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="flex border-b border-gray-900 py-2 bg-gray-900 text-white items-center">
      <div className="ml-10">
        <Link to="/" className="text-2xl text-yellow-300">
          WATCHAT
        </Link>
      </div>
      <div className="flex ml-auto mr-10 gap-8">
        <p>Đăng Nhập</p>
        <p>Đăng Ký</p>
      </div>
    </div>
  )
}

export default Header
