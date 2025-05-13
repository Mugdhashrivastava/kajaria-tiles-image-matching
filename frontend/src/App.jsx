import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SearchByImage from './components/SearchByImage';
import Recommendations from './components/Recommendations';
import SearchResults from './components/SearchResults';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<SearchByImage />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;