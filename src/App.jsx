import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GraphicDesign from './pages/GraphicDesign';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/portfolio/graphic-design"
            element={<GraphicDesign />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;