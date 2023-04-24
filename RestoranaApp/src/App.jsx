import { useState, useEffect } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

function App() {
  const [form, setForm] = useState({})

  console.log(form)

  const [menu, setMenu] = useState({})

  console.log(menu)
  
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
              });
    }

    const handleGet=()=>{
      axios.get(`http://localhost:3004/menu`).then((response) => {
          
      console.log(response.data)
      setMenu(response.data)
      })
    }
  
      useEffect(() => {
        handleGet()
      }, [])

  return (
    <>
      <div>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Dish Name</Form.Label>
        <Form.Control type="text" placeholder="Enter email dish name" name="dish_name"  onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Dish Description</Form.Label>
        <Form.Control type="text" placeholder="Enter email dish description" name="dish_descr" onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="$$$" name="price" onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </div>
      

      
    </>
  )
}

export default App
