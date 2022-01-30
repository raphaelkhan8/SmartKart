import React from 'react'
import { withRouter } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

const Header = ({ history }) => {

  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.userLogin)

  const handleLogout = () => {
    dispatch(logout())
    history.push('/login')
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>SmartKart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link><i className='fas fa-shopping-cart'></i> CART</Nav.Link>
            </LinkContainer>
            {userInfo ? 
            (<NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>) : 
            (<LinkContainer to='/login'>
              <Nav.Link><i className='fas fa-user'></i> SIGN IN</Nav.Link>
            </LinkContainer>)}
            {userInfo && userInfo.isAdmin ? 
            (<NavDropdown title='Admin' id='adminmenu'>
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orderlist'>
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>) : <div></div>}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default withRouter(Header)
