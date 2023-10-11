import React, { useEffect, useState } from 'react'
import classes from './foodpage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../../services/foodService';
import StarRating from '../../../component/Header/StarRating/StarRating';
import Tags from '../../../component/Header/Tags/Tags';
import Price from '../../../component/Header/Price/Price';
import { useCart } from '../../../hooks/useCart';
import NotFound from '../../../component/Header/NotFound/NotFound';
export default function FoodPage() {
  const [food,setFood]=useState({});
  const {id}=useParams();
  const {addToCart}=useCart();
  const navigate=useNavigate();
  const handelAddToCart=()=>{
    addToCart(food);
    navigate('/cart');
     
  }
  useEffect(()=>{
    getById(id).then(setFood);
  },[id]); 
    
  
    return (
    <>
    {!food? <NotFound message="Food Not Found"linkText="Back To HomePage"/> :(
        <div className={classes.container}>
            <img className={classes.image}src={`/foods/${food.imageUrl}`} alt={food.name} />
            <div className={classes.details}>
               <div className={classes.header}>
                 <span className={classes.name}>{food.name}</span>
                 <span className={`${classes.favorite}${food.favorite?'':classes.not}`}>
                 ❤ 
                 </span>

               </div>
               <div className={classes.rating}>
                  <StarRating stars={food.stars}size={25}/>
               </div>
               <div className={classes.origins}>
                 {food.origins?.map(origin=>(
                    <span key={origin}>{origin}</span>
                 ))}
               </div>
               <div className={classes.tags}>
                 {food.tags &&(
                    <Tags 
                    tags={food.tags.map(tag=>({name:tag}))}
                    forFoodPage={true}
                    />
                    )}
               </div>
               <div className={classes.cook_time}>
                <span>
                    Time to cook about<strong>{food.cookTime}</strong>minutes
                </span>
               </div>
               <div className={classes.price}>
                <Price price={food.price}/>
               </div>
               <button onClick={handelAddToCart}>Add To Cart</button>
            </div>

        </div>
    )}
    </>
  );
}
