import React from 'react'

export default function Button({ children, onClick }) {
    return (
        <button onClick={onClick} className='bg-blue-200 text-black px-4 py-3 text-lg rounded-pill hover:bg-blue-300 transition duration-150 ease-in-out'>{children}</button>
    )
}