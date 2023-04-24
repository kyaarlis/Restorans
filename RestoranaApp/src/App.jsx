import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

function App() {
  const [form, setForm] = useState({})

  const [menu, setMenu] = useState([])

  const [newDish, setNewDish] = useState({ name: "", descriptin: "", price: 0})


    const handleGet=()=>{
      axios.get(`http://localhost:3004/menu`).then((response) => {
        

      setMenu(response.data)
      })
    }
  
    // Atjaunina veidlapas datus, kad lietotājs sniedz datus
    const handleChange = (event) => {   
      const name = event.target.name
      const value = event.target.value
      setForm((values) => ({ ...values, [name]: value }))
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`http://localhost:3004/menu`, newDish).then(() => {
        handleGet();
        setNewDish({ name: "", descriptin: "", price: 0});
      })
    }

  return (
    <>
      <div>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Dish Name</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
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
