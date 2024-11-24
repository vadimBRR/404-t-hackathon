import React from 'react'
import Container from '../../components/Container'
import FileUploader from '../../components/FileUploader'

const CreateFormular = () => {
	return <Container>
    <div className='w-full h-full flex items-center justify-center'>
      <div className='px-8  border border-primary pb-4'>
        <p className='py-8 text-2xl font-bold'>Attach a document (*.pdf)</p>
        <FileUploader/>

      </div>
    </div>
  </Container>
}

export default CreateFormular
