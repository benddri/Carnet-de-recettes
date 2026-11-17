import axios from "axios";

const instance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,


});
export async function getRecipes() {
    const response= await instance.get("/recipes?limit=12")
    return response.data
    
}
