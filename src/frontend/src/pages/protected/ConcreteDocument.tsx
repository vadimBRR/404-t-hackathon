import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import CreateCard from '../../components/MainPage/CreateCard'
import TemplateCard from '../../components/MainPage/TemplateCard'
import { templates } from '../../constatns'


const ConcreteDocument = () => {
	return (
		<Container isTopBar={true}>
			<div className='flex flex-col justify-between h-full w-full'>
				<div className='w-full flex justify-center'>

				</div>
			</div>
		</Container>
	)
}

export default ConcreteDocument
