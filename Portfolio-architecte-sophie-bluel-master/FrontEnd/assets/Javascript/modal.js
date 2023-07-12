// OUVRE LA MODALE
document.querySelectorAll(".open_modal").forEach((e) => {
  e.addEventListener("click", function () {
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".modal").classList.add("modal_open");
    document.querySelector("#modal_delete").classList.add("modal_open");
  });
});

// FERME LA MODALE EN CLIQUANT SUR LA CROIX
document.querySelectorAll(".modal_close").forEach(function (e) {
  e.addEventListener("click", function () {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".modal").classList.remove("modal_open");
    document.querySelector("#modal_delete").classList.remove("modal_open");
  });
});

//FERMETURE DE LA MODALE EN CLIQUANT A LEXTERIEUR
document.querySelector(".overlay").addEventListener("click", function (event) {
  // Vérifiez si l'élément cliqué est l'overlay lui-même, et non un élément à l'intérieur de la modale
  if (event.target === this) {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".modal").classList.remove("modal_open");
    document.querySelector("#modal_delete").classList.remove("modal_open");
  }
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

// AU CLICK DE LA MODAL GALERIE PHOTO OUVERTURE DE LA MODAL AJOUT DE PROJET
const button_ajouter_photo = document.querySelector("#button_ajouter");
button_ajouter_photo.addEventListener("click", function () {
  const modal = document.querySelector("#modal");
  modal.classList.add("modal_open");
  const modal_close = document.querySelector("#modal_delete");
  modal_close.classList.remove("modal_open");
});

// RETOUR SUR LA MODAL GALERIE PHOTO LORS DU CLICK SUR LE BOUTON BACK
const button_back = document.querySelector(".button_back");
button_back.addEventListener("click", function () {
  const modal_open = document.querySelector("#modal");
  modal_open.classList.remove("modal_open");
  const modal_delete = document.querySelector("#modal_delete");
  modal_delete.classList.add("modal_open");
});

//Récuperation des projets de l'architecte avec fetch
async function fetchData() {
  const response = await fetch("http://localhost:5678/api/works");
  const projets = await response.json();

  //SELECTION LE PARENT GALLERY
  const gallery_modal = document.querySelector(".gallery_modal");

  // BOUCLE POUR AJOUTER LES MINIATURE DES IMAGE
  for (let i = 0; i < projets.length; i++) {
    //CREATION BALISE IMAGE
    const img = document.createElement("img");
    const article = document.createElement("article");
    const p = document.createElement("p");
    const span = document.createElement("span");

    //AJOUT DES IMAGES A PARTIR DE L'API A L'HTML
    img.src = projets[i].imageUrl;
    p.innerText = "éditer";
    span.innerHTML =
      '<i class="fa-solid fa-arrows-up-down-left-right trash_can hidden_arrow"></i> <i class="fa-solid fa-trash-can trash_can"></i>';

    article.style.position = "relative";
    span.classList.add("span_icon");

    //AJOUT ECOUTEUR AUX IMAGES ET A LA POUBELLE
    article.addEventListener("mouseenter", function () {
      span.firstElementChild.classList.remove("hidden_arrow");
    });

    article.addEventListener("mouseleave", function () {
      span.firstElementChild.classList.add("hidden_arrow");
    });

    span.addEventListener("click", function (event) {
      event.preventDefault(); // Empêche le rechargement de la page
      event.stopPropagation();

      deleteImage(projets[i].id);
    });

    article.appendChild(img);
    article.appendChild(span);
    article.appendChild(p);

    gallery_modal.appendChild(article);
  }
}

fetchData();

// SUPPRIME LIMAGE VIA LAPI
function deleteImage(id) {
  const token = localStorage.getItem("token");
  console.log(`Bearer ${token}`);

  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      if (response.ok) {
        // La suppression a réussi
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
}
