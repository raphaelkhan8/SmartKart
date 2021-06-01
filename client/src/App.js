import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './views/HomeView'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <main className='py-3'>
        <Container>
          <HomeView />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
