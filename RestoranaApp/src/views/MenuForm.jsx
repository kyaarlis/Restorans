import { useState, useEffect } from 'react'
// import './App.css'
import '../styles/FormMenu.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function MenuForm() {
  document.title = "Restorans"  

  const [form, setForm] = useState({})
  
    // Atjaunina veidlapas datus, kad lietotājs sniedz datus
    const handleChange = (event) => {   
      const name = event.target.name
      const value = event.target.value
      setForm((values) => ({ ...values, [name]: value }))
    }

    // Nosūtam datus uz datubāzi 
    const handleSubmit = (event) => {
      event.preventDefault()
  
      axios.post("http://localhost:3004/menu", form)
              .then(function (res) {
                console.log(res.data);
                handleClick()
              });
              
    }

  // page routing
  const navigate = useNavigate()

  function handleClick() {
    navigate("../menu")
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className='p'>Dish Name</Form.Label>
        <Form.Control type="text" placeholder="Enter dish name" name="dish_name"  onChange={handleChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label className='p'>Dish Description</Form.Label>
        <Form.Control type="text" placeholder="Enter dish description" name="dish_descr" onChange={handleChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label className='p'>Price</Form.Label>
        <Form.Control type="number" placeholder="$$$" name="price" min={0} onChange={handleChange} required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
   
    </>
  )
}

export default MenuForm
