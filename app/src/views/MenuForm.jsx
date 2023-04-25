import { useState } from 'react'
import Button from 'react-bootstrap/Button';  
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
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

    const handleFileUpload = (event) => {
      setForm({ ...form, dish_img: event.target.files[0] });
      console.log(form);
    }

    const handleSubmit = (event) => {
      event.preventDefault()
    
      const formData = new FormData()
      formData.append("dish_name", form.dish_name)
      formData.append("dish_descr", form.dish_descr)
      formData.append("price", form.price)
      formData.append("dish_img", form.dish_img)
    
      axios.post("http://localhost:3004/menu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(function (res) {
        console.log(res.data)
        handleClick()
      })
    }
    
    
  // page routing
  const navigate = useNavigate()

  function handleClick() {
    navigate("../menu")
  }

  return (
    <div className="flex justify-center items-center flex-col bg-form-bg-img bg-cover bg-no-repeat h-screen w-screen text-white">


      <h1 className='color-[#fdd6d6]  tw:text-stroke tw:text-stroke-white' >Add Dish</h1>
      {/* color-[#fdd6d6]*/}

      <Container className='flex justify-center items-center'>
      <Form className='mt-3' onSubmit={handleSubmit}>
        
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className='p'>Dish Name</Form.Label>
        <Form.Control type="text" maxLength={100} placeholder="Enter dish name" name="dish_name"  onChange={handleChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Dish Description</Form.Label>
        <Form.Control as="textarea" rows={3} maxLength={200} placeholder="Enter dish description" name="dish_descr" onChange={handleChange} required/>
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Add Dish Image</Form.Label>
        <Form.Control type="file" name="dish_img" onChange={handleFileUpload} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="€" name="price" min={0} onChange={handleChange} required/>
      </Form.Group>
      
      <div className='flex justify-between'>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="warning" onClick={handleClick}>
        Go To Menu
        </Button>
        </div>
    </Form>
    </Container>
    </div>
  )
}

export default MenuForm
