
import axios from "axios";

const instance = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 5000,
});
function gererErreur(error) {
    if (error.response) {
        if (error.response.status === 404) {
            throw new Error("RECETTE_INTRouvable");
        } else if (error.response.status === 500) {
            throw new Error("ERREUR_SERVEUR");
        }
    } else if (error.request) {
        throw new Error("SERVEUR_INJOIGNABLE");
    }

    throw error;
}

export async function getRecipes() {
    try {
        const response = await instance.get("/recipes?limit=12");
        return response.data;
    } catch (error) {
        gererErreur(error);
    }
}

export async function searchData(query) {
    try {
        const response = await instance.get("/recipes/search", {
            params: {
                q: query
            }
        });
        return response.data;

    } catch (error) {
        gererErreur(error);
    }
}


export async function addRecipe(recipe) {
    try {
        const response = await instance.post("/recipes/add", recipe);
        return response.data;

    } catch (error) {
        gererErreur(error);
    }
}
export async function deleteRecipe(id) {
    try {
        const response = await instance.delete(`/recipes/${id}`);
        return response.data;

    } catch (error) {
        gererErreur(error);
    }
}
//test  d'ereur 404
// export async function tester404() {
//     try {
//         const response = await instance.get("/recipes/999999");
//         return response.data;
//     } catch (error) {
//         gererErreur(error);
//     }
// }

export async function tester500() {
    try {
        const response = await instance.get("/http/500");
        return response.data;
    } catch (error) {
        gererErreur(error);
    }
}