import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './pages/auth/AuthLayout'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import RootLayout from './pages/protected/RootLayout'
import Home from './pages/protected/Home'
import Templates from './pages/protected/Template'

function App() {
	return (
		<div className='flex h-screen'>
			<Routes>
				{/* <Route element={<AuthLayout />}>
					<Route path='/sign-in' element={<SignIn />} />
					<Route path='/sign-up' element={<SignUp />} />
				</Route> */}

				<Route element={<RootLayout />}>
					<Route path='/' element={<Home />} />
					{/* <Route path='/receipts' element={<Receipts />} /> */}
					{/* <Route path='/receipts/:id' element={<ReceiptsInfo />} /> */}
					<Route path='/templates/:id' element={<Templates />} />
					{/* <Route path='/receipts-gen/:id' element={<ReceiptsGeneralInfo />} /> */}
					{/* <Route path='/product/:id/:transaction_id' element={<ProductInfo />} /> */}
				</Route>
			</Routes>
		</div>
	)
}

export default App
