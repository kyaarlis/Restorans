import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../styles/AllDishesCSS.css'

function AllDishes() {
    document.title = "Edienkarte"  

    const [menu, setMenu] = useState([])

    console.log(menu)

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
        <div className='body'>
        <Container>
        <Button onClick={handleClick}>Go Back</Button>
        <div className="body">
            <div className='grid-wrapper'>
             {menu.map((dish) => (
                <div key={dish.id} className='.grid-item'>
                  <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                  <Card.Title>{dish.dish_name}</Card.Title>
                  <Card.Text>
                  Description:  {dish.dish_descr}
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