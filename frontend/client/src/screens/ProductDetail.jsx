import React, { useEffect, useState } from 'react'
import { Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';


const ProductDetail = () => {

	const { id } = useParams()
	const navigate = useNavigate();

	const [title, setTitle] = useState('')
	const [price, setPrice] = useState(0)
	const [description, setDescription] = useState('')

	useEffect(() => {

		const getSingleProductsData = async () => {
			const { data } = await axios.get(`/api/products/${id}`);
			console.log(data);
			setTitle(data.title);
			setPrice(data.price);
			setDescription(data.description)
		}
		getSingleProductsData();

	}, [id])

	//handling Delete

	const handlerDelete = async (id) => {
		await axios.delete(`/api/products/${id}`)
		navigate('/products')
	}

	return (
		<>
			<Container className='mt-10 p-4'>
			<h1>Detail Product</h1>

			<Card className='shadow-lg m-2 p-3 rounded' style={{ width: '18rem' }}>
				<Card.Body>
					<Card.Title>Title: {title}</Card.Title>
					<Card.Title>Price: ${price}</Card.Title>
					<Card.Text>
						Desctiption: {description}
					</Card.Text>
					<Link to={`/product/edit/${id}`}>
						<Button>Edit</Button>
					</Link>
						<Button onClick={() => handlerDelete(id)}>Delete</Button>
				</Card.Body>
			</Card>
			</Container>

		</>
	)
}

export default ProductDetail