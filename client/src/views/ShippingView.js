import React, { useState } from 'react'
import { Form, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { states } from '../constants/states'

const ShippingView = ({ history }) => {

	const { shippingAddress } = useSelector(state => state.cart)

	const [address, setAddress] = useState(shippingAddress.address || '')
	const [city, setCity] = useState(shippingAddress.city || '')
	const [state, setState] = useState(shippingAddress.state || '')
	const [zipcode, setZipcode] = useState(shippingAddress.zipcode || '')
	const [country, setCountry] = useState(shippingAddress.country || '')
	
	const dispatch = useDispatch()
	
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({ address, city, state, zipcode, country }))
		history.push('/payment')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
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

				<FormGroup controlId='state'>
        			<FormLabel>Select State</FormLabel>
        			<FormControl as="select" value={state} required
          				onChange={e => { setState(e.target.value)}}>
						{states.map(state => {
							const { name, abbrev } = state
							return <option key={abbrev} value={name}>{name}</option>
						})}
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