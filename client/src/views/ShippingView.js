import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Meta from '../components/Meta'
import { states } from '../utils/states'

const ShippingView = ({ history }) => {

	const { shippingAddress } = useSelector(state => state.cart) || {}

	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('Alabama')
	const [zipcode, setZipcode] = useState('')
	const [country, setCountry] = useState('')
	
	const dispatch = useDispatch()

	useEffect(() => {
		if (shippingAddress) {
			setAddress(shippingAddress.address)
			setCity(shippingAddress.city)
			setState(shippingAddress.state)
			setZipcode(shippingAddress.zipcode)
			setCountry(shippingAddress.country)
		}
	}, [shippingAddress])
	
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({ address, city, state, zipcode, country }))
		history.push('/payment')
	}

	return (
		<div>
			<Meta title='Shipping' />
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
		</div>
	)
}

export default ShippingView;