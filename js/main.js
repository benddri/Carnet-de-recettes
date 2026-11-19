import { getRecipes } from "./api.js";
import{ searchData}from"./api.js";
import "../css/style.css";
import { afficherRecettes } from "./affichage.js";

export async function afficher() {
  const recipesListe = document.querySelector("#recipes-list");
  const recipesCount =  document.querySelector("#recipes-count")
  const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
  const data = await getRecipes();
  afficherRecettes(data.recipes);
// console.log(data.recipes);
searchBtn.addEventListener("click",async()=>{
  const query=searchInput.value.trim()
  const data=await searchData(query)
  if (data.recipes.length===0){
    recipesListe.textContent=`Aucune recette trouvée `
    recipesCount.textContent=`0 Recettes`
    re
  }else{
      afficherRecettes(data.recipes);
  }

})
 
    
}

afficher()


  