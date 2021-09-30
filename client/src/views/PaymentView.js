import React, { useState } from 'react'
import { Form, FormControl, FormGroup, FormLabel, Col, Button, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentView = ({ history }) => {

	const { shippingAddress } = useSelector(state => state.cart)

	if (!shippingAddress) {
		history.push('/shipping')
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal')
	
	const dispatch = useDispatch()
	
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		history.push('/placeorder')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<FormGroup>
					<FormLabel as='legend'>Select Method</FormLabel>
					<Col>
						<FormCheck type='radio' label='PayPal' id='PayPal' name='paymentMethod' value='PayPal' checked
							onChange={(e) => setPaymentMethod(e.target.value)}>
						</FormCheck>
					</Col>
					<Col>
						<FormCheck type='radio' label='Credit Card' id='Credit Card' name='paymentMethod' value='Credit Card'
							onChange={(e) => setPaymentMethod(e.target.value)}>
						</FormCheck>
					</Col>
					<Col>
						<FormCheck type='radio' label='Gift Card' id='Gift Card' name='paymentMethod' value='Gift Card'
							onChange={(e) => setPaymentMethod(e.target.value)}>
						</FormCheck>
					</Col>
				</FormGroup>
				<Button type='submit' variant='primary'>Continue</Button>
			</Form>
		</FormContainer>
	);
}

export default PaymentView;