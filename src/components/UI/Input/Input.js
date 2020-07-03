import React from 'react'
import './Input.sass';
const Input = (props) => {
  return (
    <div>
      <input {...props} 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  )
}

export default Input
