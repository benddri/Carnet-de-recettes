
export function validerRecette(nom, cuisine, difficulte, temps) {
    const erreurs = {};

    const tempsNumber = Number(temps);

    // Validation du nom
    if (nom.trim().length < 3 || nom.trim().length > 60) {
        erreurs.nom = "Le nom doit contenir entre 3 et 60 caractères";
    }

    // Validation de la cuisine
    if (cuisine.trim() === "") {
        erreurs.cuisine = "Veuillez saisir la cuisine";
    }

    // Validation de la difficulté
    if (difficulte.trim() === "") {
        erreurs.difficulte = "Veuillez choisir une difficulté";
    }

    // Validation du temps
    if (
        temps === "" ||
        Number.isNaN(tempsNumber) ||
        tempsNumber < 1 ||
        tempsNumber > 300
    ) {
        erreurs.temps = "Le temps doit être entre 1 et 300 minutes";
    }

    return erreurs;
}
