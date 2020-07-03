import React from 'react'
import './Input.sass';
const Input = (props) => {

  return (
    <div className="max-w-sm mx-auto">
      { props.label ? <p className="text-sm mb-2 text-gray-600">{props.label}</p> : null }
      <input {...props} 
        className={`${props.className} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      />
    </div>
  )
}

export default Input
