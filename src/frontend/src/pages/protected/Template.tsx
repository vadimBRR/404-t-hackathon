import { useParams, useSearchParams, Link } from 'react-router-dom'
import { ChevronLeft, Check, CircleDot } from 'lucide-react'
import Container from '../../components/Container'
import { templates } from '../../constatns'
import { employees } from '../../constatns'
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
							<div className='flex flex-col my-10'>
								<div className='flex flex-row mb-[28px]'>
									<div
										className={` w-7 h-7 bg-[#FF0000] rounded-full flex items-center justify-center mr-2`}
									>
										<p className='text-white'>{template.new_users}</p>
									</div>
									<p className='text-2xl font-bold'>Inbox for this template</p>
								</div>

								<div className='flex w-10/12 flex-col'>
									{employees.map(item => (
										<Link className='mb-[1px]' to={`/ConcreteDocument/${item.document_id}`}>
											<div key={item.document_id}>
											{/* border-b border-[#C4C4C4] */}
												<div className='flex flex-row justify-between items-center bg-white p-4 px-3 shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]'> 
													<div className='flex flex-row items-center gap-5'>
														{item.read_state ? (
															<Check color='#0cb33f' size={20} />
														) : (
															<CircleDot color='#b31d0c' size={20} />
														)}

														<p className='text-base'>{item.email}</p>
													</div>
													<div className='text-[#32C200]'>{item.alert}</div>
													{/* #D79B00 */}
													{/* #EE0000 */}
												</div>
											</div>
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-4 w-[80%]'>
						<h1 className='text-[40px] font-bold'>AI generated description of the document</h1>
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
