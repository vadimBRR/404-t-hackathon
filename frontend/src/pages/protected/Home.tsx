import React, { useState } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { usePredictTotalPrice, usePredictTotalPriceMutation } from '../../api'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { Navigate } from 'react-router-dom'
import Container from '../../components/Container'
import BottomBar from '../../components/BottomBar'
import Navbar from '../../components/Navbar'
import TopBar from '../../components/TopBar'
import CustomRadioButton from '../../components/CustomRadioButton'
import CustomCheckBox from '../../components/CustomCheckBox'
import FileUploader from '../../components/FileUploader'
import CreateCard from '../../components/MainPage/CreateCard'
import TemplateCard from '../../components/MainPage/TemplateCard'

const Home = () => {
  
  return <Container isTopBar = {true}>
    <div className='flex flex-col justify-between h-full w-full'>
      {/* <Navbar/> */}
      <div className='w-full h-full flex flex-wrap gap-x-10 px-8'>

        <CreateCard/>
        <TemplateCard/>
      {/* <h1>Home</h1> 
      <CustomInput name='username' setName={()=>{}} title='Username' containerStyle='my-4 mx-5'/>
      <CustomRadioButton titles={['Male','Female']} value={true} setValue={()=>{}}/>
        <CustomCheckBox value={true} setValue={()=>{}} titles='test' containerStyle='flex flex-row gap-2'/>

      <FileUploader/> */}


      </div>
      {/* <BottomBar/> */}

    </div>
    {/* <TopBar name='Home' isArrow={false} link='/'/> */}
  </Container>
}

export default Home