import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddProduct from './screens/AddProduct'
import EditProduct from './screens/EditProduct'
import ProductDetail from './screens/ProductDetail'
import ShowProducts from './screens/ShowProducts'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route exact path='/addProduct' element={<AddProduct />} />
				<Route exact path='/products' element={<ShowProducts />} />
				<Route exact path='/products/edit/:id' element={<EditProduct />} />
				<Route exact path='/products/:id' element={<ProductDetail />} />
			</Routes>
		</Router>
	)
}

export default App