document.querySelectorAll(".open_modal").forEach((e) => {
  e.addEventListener("click", function () {
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".modal").classList.add("modal_open");
  });
});

document.querySelectorAll(".modal_close").forEach(function (e) {
  e.addEventListener("click", function () {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".modal").classList.remove("modal_open");
  });
});

//AJOUTER LES CATEGORIE DANS LE SELECT
async function setCategorie() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categorie = await response.json();
  const select = document.querySelector("#categorie");
  for (let i = 0; i < categorie.length; i++) {
    const option = document.createElement("option");
    option.innerText = categorie[i].name;
    option.value = categorie[i].id;
    select.appendChild(option);
  }
}

setCategorie();

//ENVOYER LE FORMULAIRE VIA LAPI
//SELECTIONNER LE FORMULAIRE
const form = document.querySelector(".modal form");

form.addEventListener("submit", function (event) {
  //EMPECHE LE COMPORTEMENT PAR DEFAULT DU FORMULAIRE
  event.preventDefault();

  //RECUPERATION DES VALEURS DES ENTREES
  const imgInput = document.querySelector("#img");
  const titleInput = document.querySelector("#title");
  const categorieInput = document.querySelector("#categorie");

  const img = imgInput.files[0];
  const title = titleInput.value;
  const categorie = categorieInput.value;

  //CONSTRUCTION DE LOBJET DE DONNEE A ENVOYER
  let formData = new FormData();
  formData.append("title", title);
  formData.append("category", parseInt(categorie));
  formData.append("image", img);

  const token = localStorage.getItem("token");

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then(function (response) {
      if (response.ok) {
        // Le statut de la réponse est "OK" (200)
        // ...
      } else if (response.status === 401) {
        throw new Error("Erreur dans l'identifiant ou le mot de passe");
      } else {
        throw new Error("Erreur lors de la requête");
      }
    })
    .catch(function (error) {
      // Gérer les erreurs de la requête
      console.error(error);
    });
});

// AFFICHER LIMAGE SELECTIONNER DANS LE INPUT FILE
const input = document.querySelector("#img"); // Sélection de l'input
const preview = document.createElement("img"); // création de l'élément <img> pour l'aperçu
const modal_input = document.querySelector(".modal_input");
input.addEventListener("change", function () {
  const file = input.files[0]; // Récupération du fichier sélectionné dans l'input

  if (file) {
    const reader = new FileReader();
    modal_input.innerHTML = "";
    modal_input.appendChild(preview); // Création d'une instance de FileReader pour lire le fichier

    reader.addEventListener("load", function () {
      preview.src = reader.result; // Attribution de l'URL de l'image à l'attribut "src" de l'élément <img>
    });

    reader.readAsDataURL(file); // Lecture du fichier en tant que Data URL
  } else {
    preview.src = ""; // Effacement de l'aperçu s'il n'y a pas de fichier sélectionné
  }
});
