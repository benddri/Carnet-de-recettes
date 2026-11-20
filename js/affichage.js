
import { deleteRecipe } from "./api.js";

export function creerCarte(recipe) {

    // Carte principale
    const card = document.createElement("div");
    card.className = "group bg-white rounded-2xl shadow-md overflow-hidden border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col ";

    // Image
    const image = document.createElement("img");

    if (recipe.image) {
        image.src = recipe.image;
    } else {
        image.src = "https://placehold.co/600x400?text=Recipe";
    }

    image.alt = recipe.name;
    image.loading = "lazy";
   
   image.className = "w-full  object-cover bg-orange-50 group-hover:scale-105 transition-transform duration-500";

    // Contenu
    const info = document.createElement("div");
   info.className = "p-4 flex flex-col flex-1";

    // Nom
    const name = document.createElement("h3");
    name.textContent = recipe.name;
    name.className = "text-lg font-bold text-gray-900 mb-2 line-clamp-2";

    // Cuisine
    const cuisine = document.createElement("p");
    cuisine.textContent = `Cuisine : ${recipe.cuisine}`;
    cuisine.className = "text-gray-600 text-sm mb-3";

    // Difficulté
    const difficulty = document.createElement("p");
    difficulty.textContent = `Difficulté : ${recipe.difficulty || "Non précisée"}`;
    difficulty.className = "text-gray-600 text-sm mb-3";

    // Temps de préparation
    const prepTimeMinutes = document.createElement("p");
    prepTimeMinutes.textContent = `Temps de préparation : ${recipe.prepTimeMinutes} min`;
    prepTimeMinutes.className = "text-orange-700 font-semibold text-sm mb-5";

    // Bouton supprimer
    const supprimerbtn = document.createElement("button");
    supprimerbtn.textContent = "Supprimer";
    supprimerbtn.className = "mt-auto w-full bg-orange-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300";
    supprimerbtn.type = "button";
    supprimerbtn.dataset.id = recipe.id;

    supprimerbtn.addEventListener("click", async () => {

        const confirmation = confirm(
            "Voulez-vous vraiment supprimer cette recette ?"
        );

        if (!confirmation) {
            return;
        }

        try {
            await deleteRecipe(recipe.id);

            card.remove();

            const recipesCount = document.querySelector("#recipes-count");
            const recipesListe = document.querySelector("#recipes-list");

            recipesCount.textContent = `${recipesListe.children.length} Recettes`;

            alert("Recette supprimée avec succès !");

        } catch (error) {
            console.log("Erreur :", error);
            alert("Erreur lors de la suppression.");
        }
    });

    // Ajouter les éléments
    info.appendChild(name);
    info.appendChild(cuisine);
    info.appendChild(difficulty);
    info.appendChild(prepTimeMinutes);
    info.appendChild(supprimerbtn);

    card.appendChild(image);
    card.appendChild(info);

    return card;
}


// Afficher toutes les recettes
export function afficherRecettes(recipes) {

    const recipesListe = document.querySelector("#recipes-list");
    const recipesCount = document.querySelector("#recipes-count");

    recipesListe.textContent = "";

    recipes.forEach(recipe => {
        const card = creerCarte(recipe);
        recipesListe.appendChild(card);
    });

    recipesCount.textContent = `${recipes.length} Recettes`;
}


// Ajouter une recette en tête de liste
export function ajouterRecetteEnTete(recipe) {

    const recipesListe = document.querySelector("#recipes-list");
    const recipesCount = document.querySelector("#recipes-count");

    const card = creerCarte(recipe);

    recipesListe.prepend(card);

    recipesCount.textContent = `${recipesListe.children.length} Recettes`;
}
