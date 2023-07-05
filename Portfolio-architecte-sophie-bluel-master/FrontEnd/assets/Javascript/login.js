//SELECTIONNER LE FORMULAIRE
const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  //EMPECHE LE COMPORTEMENT PAR DEFAULT DU FORMULAIRE
  event.preventDefault();

  //RECUPERATION DES VALEURS DES ENTREES
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");

  const email = emailInput.value;
  const password = passwordInput.value;

  //CONSTRUCTION DE LOBJET DE DONNEE A ENVOYER
  const data = {
    email: email,
    password: password,
  };

  //ENVOIE DE LA REQUETE POST AVEC LES DONNEES
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.ok) {
        // Le statut de la réponse est "OK" (200)
        // Récupérer le token à partir de la réponse
        return response.json();
      } else if (response.status === 401) {
        const error = document.querySelector("#error");
        error.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
        error.style.color = "red";
        error.style.fontWeight = "bolder";

        throw new Error("Erreur dans l'identifiant ou le mot de passe");
      } else {
        throw new Error("Erreur lors de la requête");
      }
    })

    .then(function (data) {
      const token = data.token; // Récupérer le token à partir des données
      localStorage.setItem("token", token);
      // Redirection vers la page d'accueil ou autre action à effectuer
      window.location.href = "index.html";
    })
    .catch(function (error) {
      // Gérer toutes les autres erreurs ici
    });
});
