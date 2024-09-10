import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Dashboard from '../pages/Dashboard/Dashboard'
import Admin from '../pages/Admin/Admin'

function AppRoutes() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path='login' element={<Home login={true} />} />
					<Route path='register' element={<Home register={true} />} />
					<Route path='/user/dashboard/*' element={<Dashboard />} />
					<Route path='/admin/dashboard/*' element={<Admin />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default AppRoutes
