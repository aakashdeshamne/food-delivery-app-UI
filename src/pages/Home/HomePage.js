import React,{useEffect, useReducer} from 'react';
import { getAll, getAllByTags, getAllTags, search } from '../../services/foodService';
import Thumbnails from '../../component/Header/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../component/Header/Search/Search';
import Tags from '../../component/Header/Tags/Tags';
import NotFound from '../../component/Header/NotFound/NotFound';
const initialState={foods:[],tags:[]};
const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const[state,dispatch]=useReducer(reducer,initialState);
  const {foods,tags}=state;
  const {searchTerm,tag}=useParams();
  useEffect(() => {
    getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));
  
    let loadFoodsPromise;
    if (tag) {
      loadFoodsPromise = getAllByTags(tag);
    } else if (searchTerm) {
      loadFoodsPromise = search(searchTerm);
    } else {
      loadFoodsPromise = getAll();
    }
  
    loadFoodsPromise.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
  }, [searchTerm, tag]);
  
  return (
    <>
    <Search/>
    <Tags tags={tags}/>
    {foods.length===0&&<NotFound/>}
    <Thumbnails foods={foods}/>
    </>
  );
}
