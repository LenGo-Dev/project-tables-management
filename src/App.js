import { Container } from 'react-bootstrap';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import Home from './components/pages/Home/Home';
import Table from './components/pages/Table/Table';
import NotFound from "./components/pages/NotFound/NotFound";
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/table/:tableId" element={<Table />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
