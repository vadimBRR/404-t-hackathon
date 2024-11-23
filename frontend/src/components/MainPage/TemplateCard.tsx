import React from 'react'
import doc_example from './../../assets/doc_example.png'

const TemplateCard = () => {
  return (
<div className='w-[250px] h-[250px] bg-[#E5E5E5] flex items-center justify-center relative'>
        <img src={doc_example} alt="" className='w-[250px] aspect-square'/>
        <div className='bg-primary absolute bottom-0 left-0  w-full h-10'>
          <p className='text-whi'>Dohoda o brigade</p>
        </div>
    </div>
  )
}

export default TemplateCard