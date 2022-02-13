import { Container } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './views/HomeView'
import ProductView from './views/ProductView'
import CartView from './views/CartView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ProfileView from './views/ProfileView'
import ShippingView from './views/ShippingView'
import PaymentView from './views/PaymentView'
import PlaceOrderView from './views/PlaceOrderView'
import OrderView from './views/OrderView'
import UserListView from './views/UserListView'
import UserEditView from './views/UserEditView'
import ProductListView from './views/ProductListView'
import ProductEditView from './views/ProductEditView'
import OrderListView from './views/OrderListView'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeView} exact />
          <Route path='/page/:pageNumber' component={HomeView} exact />
          <Route path='/login' component={LoginView} />
          <Route path='/register' component={RegisterView} />
          <Route path='/profile' component={ProfileView} />
          <Route path='/product/:id' component={ProductView} />
          <Route path='/search/:keyword' component={HomeView} />
          <Route path='/search/:keyword/page/:pageNumber' component={HomeView} exact />
          <Route path='/cart/:id?' component={CartView} />
          <Route path='/shipping' component={ShippingView} />
          <Route path='/payment' component={PaymentView} />
          <Route path='/placeorder' component={PlaceOrderView} />
          <Route path='/order/:id' component={OrderView} />
          <Route path='/admin/userlist' component={UserListView} />
          <Route path='/admin/user/:id/edit' component={UserEditView} />
          <Route path='/admin/productlist' component={ProductListView} />
          <Route path='/admin/product/:id/edit' component={ProductEditView} />
          <Route path='/admin/orderlist' component={OrderListView} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
