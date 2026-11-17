import { getRecipes } from "./api.js";
import "../css/style.css";
import { afficherRecettes } from "./affichage.js";

export async function afficher() {
  const data = await getRecipes();
  afficherRecettes(data.recipes);
console.log(data.recipes);
    
}
afficher()


  