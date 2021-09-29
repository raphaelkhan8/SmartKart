import React, { useState } from 'react'
import { Form, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'

const ShippingView = ({ history }) => {

	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [zipcode, setZipcode] = useState('')
	const [country, setCountry] = useState('')
	
	const submitHandler = (e) => {
		e.preventDefault()
		console.log('Boop')
	}

	return (
		<FormContainer>
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<FormGroup controlId='address'>
					<FormLabel>Address</FormLabel>
					<FormControl type='address' placeholder='Enter address' value={address} required 
						onChange={(e) => {setAddress(e.target.value)}}>
					</FormControl>
				</FormGroup>

				<FormGroup controlId='city'>
					<FormLabel>City</FormLabel>
					<FormControl type='city' placeholder='Enter city' value={city} required 
						onChange={(e) => {setCity(e.target.value)}}>
					</FormControl>
				</FormGroup>

				<FormGroup controlId='zipcode'>
					<FormLabel>Zip Code</FormLabel>
					<FormControl type='zipcode' placeholder='Enter zip code' value={zipcode} required 
						onChange={(e) => {setZipcode(e.target.value)}}>
					</FormControl>
				</FormGroup>

				<FormGroup controlId='country'>
					<FormLabel>Country</FormLabel>
					<FormControl type='country' placeholder='Enter country' value={country} required
						onChange={(e) => {setCountry(e.target.value)}}>
					</FormControl>
				</FormGroup>

				<Button type='submit' variant='primary'>Continue</Button>
			</Form>
		</FormContainer>
	);
}

export default ShippingView;