import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
	isArrow?: boolean
	name: string,
  link: string
}
const TopBar = ({ name, isArrow, link }: Props) => {
	return (
		<div className='absolute top-0 w-full py-2 bg-white '>
			<div className='relative flex flex-row items-center justify-center w-full'>
				<p className='font-bold text-xl'>{name}</p>
				{isArrow && (
					<div className='absolute left-4'>
						<Link to={link}>
							<ChevronLeft color='#000000' size={35} />
						</Link>
					</div>
				)}
				
			</div>
		</div>
	)
}

export default TopBar
