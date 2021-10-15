import React from "react"
import axios from "axios"

export const Signup = () => {
  const [input, setInput] = React.useState({
    username: "",
    password: "",
    repassword: "",
  })

  const handleOnChange = (e) => {
    setInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/account/signup")
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className=" w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleOnSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Tên Đăng Nhập
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Tên Đăng Nhập"
            autoComplete="off"
            name="username"
            value={input.username}
            onChange={handleOnChange}
          ></input>
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Mật Khẩu
          </label>
          <input
            className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Mật Khẩu"
            autoComplete="off"
            name="password"
            value={input.password}
            onChange={handleOnChange}
          ></input>
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Xác Nhận Mật Khẩu
          </label>
          <input
            className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Xác Nhận Mật Khẩu"
            autoComplete="off"
            name="repassword"
            value={input.repassword}
            onChange={handleOnChange}
          ></input>
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Đăng Ký
          </button>
        </div>
      </form>
    </div>
  )
}
