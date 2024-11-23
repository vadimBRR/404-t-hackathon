import React from 'react'

type Props = {
  value: boolean,
  setValue:React.Dispatch<React.SetStateAction<boolean>>
  titles:string[]
}
const CustomRadioButton = ({value, setValue,titles}:Props) => {
  return (
    <div className='flex flex-row gap-2'>
      <p>{titles[0]}</p>
      <input type='radio' id='male' name='hui' checked={value} onChange={()=>setValue(true)} className='w-6 h-6 '/>
      <p>{titles[1]}</p>
      
      <input type='radio' id='female' name='hui' className='w-6 h-6 ' checked={!value} onChange={()=>setValue(false)}/>
    </div>
  )
}

export default CustomRadioButton