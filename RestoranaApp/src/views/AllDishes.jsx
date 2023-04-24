import Button from 'react-bootstrap/Button';
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
        <>
        <Button onClick={handleClick}>Go Back</Button>
        <div className="body">
             <div className='grid-wrapper'>
      {menu.map((dish) => (
        <div key={dish.id} className='.grid-item'>
          <div className='grid-item-wrapper-inner'>
            <div key={dish.id}>
              <h2 >{dish.dish_name}</h2>
              <h3 >Description:  {dish.dish_descr}</h3>
              <h3 >Price:{dish.price}€</h3>
              <button onClick={() => handleDelete(dish.id)}>Dzēst</button>  
            </div>
          </div>
        </div>
      ))}
    </div>
        </div>
        </>
    )

}

export default AllDishes