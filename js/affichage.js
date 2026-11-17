export function afficherRecettes(recipes) {
     const recipesListe = document.querySelector("#recipes-list");
     const recipesCount = document.querySelector("#recipes-count");


     recipesCount.textContent = `${recipes.length} Recettes`
     recipes.forEach(recipe => {
          const card = document.createElement("div");
          card.className = "bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300";

          const info = document.createElement("div")
          info.className = "p-5"

          const name = document.createElement("h3");
          name.textContent = recipe.name;
          name.className = "text-xl font-bold text-gray-800 mb-3"

          const image = document.createElement("img")
          image.src = recipe.image
          image.alt = recipe.name
          image.className = "w-full h-56 object-conver bg-gray-100";

          const cuisine = document.createElement("p")
          cuisine.textContent = `Cuisine : ${recipe.cuisine}`;
          cuisine.className = " text-gray-600 mb-2"

          const difficulty = document.createElement("p")
          difficulty.textContent = `Difficulté : ${recipe.difficulty}`;
          difficulty.className = " text-gray-600 mb-2"

          const prepTimeMinutes = document.createElement("p")
          prepTimeMinutes.textContent = `Temps de préparation : ${recipe.prepTimeMinutes} min`;
          prepTimeMinutes.className = " text-yellow-700 font-semibold "


          info.appendChild(name);
          info.appendChild(cuisine)
          info.appendChild(difficulty)
          info.appendChild(prepTimeMinutes)

          card.appendChild(image)
          card.appendChild(info);
          recipesListe.appendChild(card)

     });
}