import React, { useEffect, useState } from 'react'
import { Card, Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';


const ProductDetail = () => {

	const { id } = useParams()
	const navigate = useNavigate();

	const [title, setTitle] = useState('')
	const [price, setPrice] = useState(0)
	const [productDescription, setProductDescription] = useState('')
	const [reviews, setReviews] = useState([])
	// for review rating and description
	const [rating, setRating] = useState(0)
	const [reviewDescription, setReviewDescription] = useState('')



	useEffect(() => {

		const getSingleProductsData = async () => {
			const { data } = await axios.get(`/api/products/getProductReviews/${id}`);
			console.log(data);
			setTitle(data.title);
			setPrice(data.price);
			setProductDescription(data.description)

			//for reviews
			setReviews(data.review)

		}
		getSingleProductsData();

	}, [id])

	//handling Delete

	const handlerDelete = async (id) => {
		await axios.delete(`/api/products/${id}`)
		navigate('/products')
	}

	//to add review

	const addReviewHandler = async () => {

		let review = {
			product_id: id,
			rating: rating,
			description: reviewDescription
		}

		await axios.post(`/api/products/addReview/${id}`, review)

		navigate(`/product/${id}`)
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
							Desctiption: {productDescription}
						</Card.Text>
						<br />

						<h4>Reviews:</h4><br />

						{reviews.length > 0 ? (
							reviews.map(review => {
								return <p key={review.id}>Rating: {review.rating} <br />Desctiption: {review.description}</p>
							})
						) : (<p>No reviews for this product</p>)}

						<Link to={`/product/edit/${id}`}>
							<Button>Edit</Button>
						</Link>
						<Button className='btn btn-danger m-2' onClick={() => handlerDelete(id)}>Delete</Button>
					</Card.Body>
				</Card>
			</Container>

			<Container>
				<h2>Add review</h2>
				<hr />

				<Form onSubmit={addReviewHandler}>
					<Form.Group className="mb-3" controlId="rating">
						<Form.Label>Rating</Form.Label>
						<Form.Control
							value={rating}
							onChange={(e) => setRating(e.target.value)}
							type="number" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="description">
						<Form.Label>Description</Form.Label>
						<Form.Control
							value={reviewDescription}
							onChange={(e) => setReviewDescription(e.target.value)}
							as="textarea" />
					</Form.Group>

					<Button variant="primary" type="submit">
						Add Review
					</Button>

				</Form>
			</Container>

		</>
	)
}

export default ProductDetail