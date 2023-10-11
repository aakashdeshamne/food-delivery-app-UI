import { sample_food, sample_tags } from "../data.js";

export const getAll=async ()=>sample_food;
export const search=async searchTerm=>sample_food.filter(item=>item.name.toLowerCase().includes(searchTerm.toLowerCase()));
export const getAllTags=async()=>sample_tags;
export const getAllByTags=async tag=>{
    if(tag==='All')return await getAll();
    return sample_food.filter(item=>item.tags?.includes(tag));
};
export const getById=async foodId=>sample_food.find(item=>item.id===foodId);