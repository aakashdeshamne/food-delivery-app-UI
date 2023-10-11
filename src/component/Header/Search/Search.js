import React,{useEffect, useState} from 'react';
import classes from './search.module.css';
import { useNavigate, useParams } from 'react-router-dom';
export default function Search() {
    const [term,setTerm]=useState('');
    const navigate=useNavigate();
    const {searchTerm}=useParams();
    useEffect(()=>{
      setTerm(searchTerm??'');
    },[searchTerm])
       const search=async()=>{
        term?navigate('/search/'+term):navigate('/');
       };
  return (
    <div className={classes.container}>
      <input type="text"
      placeholder='search food mine!'
      onChange={e=>setTerm(e.target.value)}
      onKeyUp={e=>e.key==='Enter'&&search()}
      defaultValue={searchTerm} />
      <button onClick={search}>Search</button>
      
    </div>
  )
}
