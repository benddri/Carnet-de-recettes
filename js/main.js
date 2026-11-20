
import { getRecipes, searchData} from "./api.js";
import "../css/style.css";
import { afficherRecettes } from "./affichage.js";
import "./form.js";

export async function afficher() {
    const recipesListe = document.querySelector("#recipes-list");
    const recipesCount = document.querySelector("#recipes-count");
    const searchInput = document.querySelector("#search-input");
    const searchBtn = document.querySelector("#search-btn");
    const loading = document.querySelector("#loading");
    const errorMessage = document.querySelector("#error-message");
    const retryBtn = document.querySelector("#retry-btn");
    let derniereRequete = null;
    async function executerRequete(requete) {
        loading.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        retryBtn.classList.add("hidden");

        try {
            const data = await requete();

            if (data.recipes.length === 0) {
                recipesListe.textContent = "Aucune recette trouvée";
                recipesCount.textContent = "0 Recettes";
            } else {
                afficherRecettes(data.recipes.slice(0, 12));
            }

        } catch (error) {
            console.error(error);
            recipesListe.textContent = "";
            recipesCount.textContent = "0 Recettes";

            if (error.message === "RECETTE_INTRouvable") {
                errorMessage.textContent = "Recette introuvable (404)";
            } else if (error.message === "ERREUR_SERVEUR") {
                errorMessage.textContent = "Erreur du serveur (500)";
            } else if (error.message === "SERVEUR_INJOIGNABLE") {
                errorMessage.textContent = "Serveur injoignable. Vérifiez votre connexion.";
            } else {
                errorMessage.textContent = "Une erreur est survenue.";
            }

            errorMessage.classList.remove("hidden");
            retryBtn.classList.remove("hidden");

        } finally {
            loading.classList.add("hidden");
        }
    }

      derniereRequete = getRecipes;
    await executerRequete(derniereRequete);

    //tests temporire

    // derniereRequete = tester404;
    // await executerRequete(derniereRequete);
    // derniereRequete = tester500;
    // await executerRequete(derniereRequete);

    searchBtn.addEventListener("click", async () => {
        const query = searchInput.value.trim();
        derniereRequete = () => searchData(query);

        await executerRequete(derniereRequete);
    });
    retryBtn.addEventListener("click", async () => {
        if (derniereRequete) {
            await executerRequete(derniereRequete);
        }
    });
}

afficher();
