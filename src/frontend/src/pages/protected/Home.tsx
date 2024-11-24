// import React, { useState } from 'react'
// import { useAuth } from '../../providers/AuthProvider'
// import { usePredictTotalPrice, usePredictTotalPriceMutation } from '../../api'
// import CustomInput from '../../components/CustomInput'
// import CustomButton from '../../components/CustomButton'
// import { Link, Navigate } from 'react-router-dom'
// import Container from '../../components/Container'
// import BottomBar from '../../components/BottomBar'
// import Navbar from '../../components/Navbar'
// import TopBar from '../../components/TopBar'
// import CustomRadioButton from '../../components/CustomRadioButton'
// import CustomCheckBox from '../../components/CustomCheckBox'
// import FileUploader from '../../components/FileUploader'
// import CreateCard from '../../components/MainPage/CreateCard'
// import TemplateCard from '../../components/MainPage/TemplateCard'
// import { templates } from '../../constatns'

// const Home = () => {
// 	return (
// 		<Container isTopBar={true}>
// 			<div className='flex flex-col justify-between h-full w-full '>
// 				{/* <Navbar/> */}
// 				<div className='w-full flex justify-center '>
// 					<div className='h-full flex flex-wrap gap-x-10 gap-y-10 justify-center'>
// 						<CreateCard />
// 						{templates.map(template => (
// 							<Link to={`/templates/${template.id}`}>
// 								<TemplateCard
// 									key={template.id}
// 									name={template.name}
// 									new_users={template.new_users}
// 								/>
// 							</Link>
// 						))}

// 						{/* <h1>Home</h1>
// 									<CustomInput name='username' setName={()=>{}} title='Username' containerStyle='my-4 mx-5'/>
// 									<CustomRadioButton titles={['Male','Female']} value={true} setValue={()=>{}}/>
// 									<CustomCheckBox value={true} setValue={()=>{}} titles='test' containerStyle='flex flex-row gap-2'/>

// 									<FileUploader/> */}
// 					</div>
// 				</div>

// 				{/* <BottomBar/> */}
// 			</div>
// 			{/* <TopBar name='Home' isArrow={false} link='/'/> */}
// 		</Container>
// 	)
// }

// export default Home

import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import CreateCard from '../../components/MainPage/CreateCard'
import TemplateCard from '../../components/MainPage/TemplateCard'
import { templates } from '../../constatns'

const DynamicGrid = ({ children }:PropsWithChildren) => {
	return (
		<div className='w-full max-w-7xl'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-start'>
				{React.Children.map(children, (child, index) => (
					<div key={index} className='w-full'>
						{child}
					</div>
				))}
			</div>
		</div>
	)
}

const Home = () => {
	return (
		<Container isTopBar={true}>
			<div className='flex flex-col justify-between h-full w-full'>
				<div className='w-full flex justify-center'>
					<DynamicGrid>
						<CreateCard />
						{templates.map(template => (
							<Link key={template.id} to={`/templates/${template.id}`}>
								<TemplateCard
									name={template.name}
									new_users={template.new_users}
								/>
							</Link>
						))}
					</DynamicGrid>
				</div>
			</div>
		</Container>
	)
}

export default Home
