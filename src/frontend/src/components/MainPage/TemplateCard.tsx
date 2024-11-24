import React from 'react'
import doc_example from './../../assets/doc_example.png'

type Props = {
	name: string
	new_users: number
  isShow?:boolean
}

const TemplateCard = ({ name, new_users: new_users, isShow=true }: Props) => {
	return (
		<div className='relative w-[250px]'>
			<div className='w-[250px] h-[250px] bg-[#E5E5E5] flex items-center justify-center relative rounded-xl  cursor-pointer shadow-[0px_1px_6px_4px_rgba(0,_0,_0,_0.25)] overflow-hidden'>
				<div className='overflow-hidden rounded-lg '>
					<img src={doc_example} alt='' className='w-[250px] aspect-square ' />

        {isShow && 
          <div>
          <div className='bg-primary absolute bottom-0 left-0  w-full h-12 flex items-center justify-center '>
            <p className='text-white'>{name}</p>
          </div>
        </div>}
					
				</div>
			</div>
			{( (new_users > 0)) && (
				<div
					className={`absolute w-9 h-9 bg-[#FF0000] -top-3 -right-3 rounded-full flex items-center justify-center`}
				>
					<p className='text-white'>{new_users}</p>
				</div>
			)}
      
		</div>
	)
}

export default TemplateCard
