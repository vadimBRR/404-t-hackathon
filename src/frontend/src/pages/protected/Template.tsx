import { useParams, useSearchParams } from 'react-router-dom'
import Container from '../../components/Container'
import { templates } from '../../constatns'
import TemplateCard from '../../components/MainPage/TemplateCard'
import { Share } from 'lucide-react'
const Templates = () => {
	const { id } = useParams()

	if (!id) {
		return null
	}
	const template = templates.find(template => template.id === id)

	if (!template) {
		return
	}

	return (
		<Container isTopBar>
			<div className='px-10'>
				<div className='flex flex-row w-full '>
					<div className='flex flex-col w-full '>
						<div className='flex flex-row gap-12 '>
							<TemplateCard isShow={false} name={template.name} new_users={0} />
							<div className='flex flex-col gap-4'>
								<h1 className='text-2xl font-bold'>{template.name}</h1>
								<div className='p-4 flex items-center justify-center bg-primary'>
									<p className='text-white'>See document's form</p>
								</div>
								<div>
									<p className='text-2xl font-bold'>ID: #{template.id}</p>
								</div>
								<div className=' flex flex-row items-end justify-end flex-1 '>
									<Share size={39} />
								</div>
							</div>
						</div>

						<div>
							<div className='flex flex-row my-10'>
								<div
									className={` w-7 h-7 bg-[#FF0000] rounded-full flex items-center justify-center mr-2`}
								>
									<p className='text-white'>{template.new_users}</p>
								</div>
								<p className='text-2xl font-bold'>Inbox for this template</p>
								{/* {advice.map(item => (
									<Link to={`/product/${item.id}`}>
										<div key={item.id}>
											<div className='flex flex-row justify-between items-center bg-white p-4 px-3 border-b border-[#C4C4C4]  '>
												<div className='flex flex-row items-center gap-3'>
													<Check color='#0cb33f' size={24} />
													<p className='text-base'>{item.name}</p>
												</div>
											</div>
										</div>
									</Link>
								))} */}
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-4 w-[80%]'>
						<h1>AI generated description of the document</h1>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
							praesentium recusandae quis quas? Maiores dignissimos pariatur
							nesciunt in quidem praesentium quia culpa, odio est veniam
							voluptates, consectetur nam harum magnam.
						</p>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab
							adipisci accusamus eum maxime suscipit, quas ratione natus eius
							iure quis tenetur cupiditate illum ex voluptatem sequi numquam
							nihil ipsa expedita.
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Excepturi, autem quisquam fugit culpa tempore reprehenderit aut
							inventore natus consequatur laborum iste enim vitae, pariatur
							repellendus eos? Consectetur eligendi consequatur officia.
						</p>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default Templates
