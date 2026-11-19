import { validerRecette } from "./validation.js";
import { addRecipe } from "./api.js";
import { ajouterRecetteEnTete } from "./affichage.js";
const form = document.querySelector("#recipe-form");

const nomInput = document.querySelector("#recipe-nom");
const cuisineInput = document.querySelector("#recipe-cuisine");
const difficulteInput = document.querySelector("#difficulte");
const tempsInput = document.querySelector("#temps");

const nameError = document.querySelector("#name-error");
const cuisineError = document.querySelector("#cuisine-error");
const difficulteError = document.querySelector("#difficulte-error");
const tempsError = document.querySelector("#temps-error");

const successMessage = document.querySelector("#success-message");
const button = document.querySelector("#add-recipe-btn");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    successMessage.textContent = "";
    const nom = nomInput.value;
    const cuisine = cuisineInput.value;
    const difficulte = difficulteInput.value;
    const temps = tempsInput.value;
    const erreurs = validerRecette(
    nom,
    cuisine,
    difficulte,
    temps
);
nameError.textContent = erreurs.nom || "";
cuisineError.textContent = erreurs.cuisine || "";
difficulteError.textContent = erreurs.difficulte || "";
tempsError.textContent = erreurs.temps || "";
if (Object.keys(erreurs).length > 0) {
    return;
}
const nouvelleRecette = {
    name: nom.trim(),
    cuisine: cuisine.trim(),
    difficulty: difficulte,
    prepTimeMinutes: Number(temps)
};
button.disabled = true;
//désactive le bouton pendant l’envoi
// await new Promise(resolve => setTimeout(resolve, 3000));
try {
    const resultat = await addRecipe(nouvelleRecette);

    ajouterRecetteEnTete(resultat);

    successMessage.textContent = "Recette ajoutée avec succès !";

    form.reset();

} catch (error) {
    console.log("Erreur :", error);

    successMessage.textContent = "Erreur lors de l'ajout de la recette.";

} finally {
    button.disabled = false;
}
});