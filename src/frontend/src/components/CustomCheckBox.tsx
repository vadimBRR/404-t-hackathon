import React from 'react'

type Props = {
  value:boolean
  setValue:React.Dispatch<React.SetStateAction<boolean>>
  titles?:string
  containerStyle?:string
  textStyle?:string
  checkboxStyle?:string
}
const CustomCheckBox = ({value,setValue,titles, containerStyle, textStyle, checkboxStyle}:Props) => {
  return (
    <div className={`${containerStyle}`}>
    {titles && <p className={`${textStyle}`}>{titles}</p>}
    <input type='checkbox' checked={value} onChange={()=>setValue(!value)} className={` w-6 h-6 ${checkboxStyle}`}/>

    </div>
  )
}

export default CustomCheckBox