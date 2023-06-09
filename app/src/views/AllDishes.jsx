import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Buffer } from 'buffer';


function AllDishes() {
    document.title = "Edienkarte"  

    const [menu, setMenu] = useState([])

    const handleGet=()=>{
        axios.get(`http://localhost:3004/menu`).then((response) => {
            
        console.log(response.data)
        setMenu(response.data)
        })
      }
  
      const handleDelete = (id) => {
          axios.delete(`http://localhost:3004/menu/${id}`).then((resp) => {
              handleGet();
          });
        };
    
        useEffect(() => {
          handleGet()
        } ,[])

          // page routing
  const navigate = useNavigate()

  function handleClick() {
    navigate("../")
  }

    return(
        <div className="bg-list-bg-img bg-cover bg-scroll min-h-screen">
        <Container>
        <Button className='mt-3' variant='danger' onClick={handleClick}>Go Back</Button>
        <div className="body">
            <div className="grid grid-cols-3 gap-4 p-4">
             {menu.map((dish) => (
                <div key={dish.id} className='.grid-item'>
                  <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" alt='dish_image' src={`data:image/jpeg;base64,${Buffer.from(dish.dish_img.data).toString('base64')}`} />  
                  <Card.Body>
                  <Card.Title>{dish.dish_name}</Card.Title>
                  <Card.Text>
                  Description:  {dish.dish_descr}
                  </Card.Text>
                  <Card.Text>
                  Price:  {dish.price}€
                  </Card.Text>
                  <Button variant="warning" onClick={() => handleDelete(dish.id)}>Dzēst</Button>
                  </Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        </div>
        </Container>
        </div>
    )
}

export default AllDishes