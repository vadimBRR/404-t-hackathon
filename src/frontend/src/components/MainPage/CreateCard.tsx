import React from 'react'
import plus from './../../assets/plus.png'
import { Link } from 'react-router-dom'
const CreateCard = () => {
  return (

    <Link to="add-template" className='w-[250px] h-[250px] bg-[#E5E5E5] flex items-center justify-center rounded-xl cursor-pointer'>
        <img src={plus} alt="" className='w-[100px] h-[100px]'/>
    </Link>
  )
}

export default CreateCard