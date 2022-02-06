import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button, FormControl } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')
    
    const submitHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        }
        else {
            history.push('/')
        }
    }

    return ( 
        <Form onSubmit={submitHandler} inline>
            <FormControl type='text' name='q' placeHolder='Search Products...' className='mr-sm-2 ml-sm-4' 
                onChange={(e) => setKeyword(e.target.value)}></FormControl>
            <Button type='submit' variant='outline-success' className='p-1'>Search</Button>
        </Form>
    )
}

export default withRouter(SearchBox)
