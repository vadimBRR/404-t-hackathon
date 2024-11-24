import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import CustomButton from './CustomButton'
import logo from './../assets/t_logo2.png'

const Navbar = () => {
	// const {username, token,logout} = useAuth()

	const [active, setActive] = React.useState(1)
	const navLinks = [
		{ 
			id: 1, 
			name: 'My HR office', 
			link: '/' },
		{
			id: 2,
			name: '',
			link: '/templates',
		},
		// {id: 2,
		//   name: 'Profiles',
		//   link: '/profiles',

		// },
		// {id: 3,
		//   name: 'Add Dalbaeb',
		//   link: '/add_dalbaeb',

		// },
	]
	return (
		<div className=' flex flex-row  items-center justify-between px-5 py-4 bg-[#E10075]'>
			<div className='flex flex-row gap-5 items-center'>
				{/* <h1 className='text-2xl text-main'>EazyHackhaton</h1> */}
				<img src={logo} alt='' className='w-9'/>
				{navLinks.map(item => (
					// <Link key={item.id} to={item.link}><p>{item.name}</p></Link>
					<Link
						key={item.id}
						to={item.link}
					
						onClick={() => setActive(item.id)}
					>
						<p 	className={` text-white  ${active === item.id ? 'text-2xl font-bold' : 'text-xl'} `}>{item.name}</p>
					</Link>
				))}
			</div>
      <div className='flex flex-row gap-5 items-center justify-center'>
        <p className='text-white text-xl'>jojo.bober@telekom.com</p>
        
        <div className='w-14 h-14 bg-white rounded-full'></div>
      </div>
			{/* <CustomButton handleClick={logout} text='Logout' buttonStyle='w-fit'/> */}
		</div>
	)
}

export default Navbar
