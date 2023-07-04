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
        // Faire quelque chose lorsque la réponse est réussie
        window.location.href = "index.html";
      }

      if (response.status === 401) {
        const error = document.querySelector("#error");
        error.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
        error.style.color = "red";
        error.style.fontWeight = "bolder";

        console.log(error)
        // Gérer l'erreur 401 ici, par exemple, afficher un message d'erreur ou rediriger vers la page de connexion
        throw new Error("Erreur dans l’identifiant ou le mot de passe");
      }
    })

    .catch(function (error) {
      // Gérer toutes les autres erreurs ici
      
    });
});
