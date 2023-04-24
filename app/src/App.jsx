import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuForm from './views/MenuForm.jsx';
import AllDishes from './views/AllDishes.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuForm />} />
        <Route path="/menu" element={<AllDishes />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
