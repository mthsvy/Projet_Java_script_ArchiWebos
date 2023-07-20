// REQUETE POUR RECUPERER TOUT LES projectS MY DANS UNE VARIABLE
let allProjects = [];

//Récuperation des projects de l'architecte avec fetch
async function fetchData() {
  const response = await fetch("http://localhost:5678/api/works");
  allProjects = await response.json();
  displayProjectByCategory();
}

fetchData();

//CREATION DE LA BALISE PARENT DIV BUTTON ALIGN
const button_align = document.createElement("div");

//CREATION DU BOUTON TOUS
const btn_all = document.createElement("button");
btn_all.classList.add("button_color");
btn_all.innerText = "Tous";
button_align.appendChild(btn_all);
btn_all.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  displayProjectByCategory();
});

//AFFICHAGE DES BOUTONS DES CATEGORIES A PARTIR DE LAPI
async function getCategory() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categorie = await response.json();
  for (let i = 0; i < categorie.length; i++) {
    const btn = document.createElement("button");
    btn.classList.add("button_color");
    btn.innerText = categorie[i].name;
    button_align.appendChild(btn);
    btn.addEventListener("click", function () {
      displayProjectByCategory(categorie[i].name);
    });
  }
}

getCategory();

//AJOUT DE LA CLASSE AU PARENT
button_align.classList.add("button_align");

//SELECTIONNER LELEMENT OU AJOUTER LE PARENT
const position = document.querySelector(".align_modify");

//ON AJOUTE LE PARENT DANS LE HMTL VIA LA POSITION DEFINI JUSTE AVANT
position.insertAdjacentElement("afterend", button_align);

//
async function displayProjectByCategory(categories) {
  let filtered;
  if (categories) {
    filtered = allProjects.filter(function (project) {
      return project.category.name === categories;
    });
  } else {
    filtered = allProjects;
  }

  document.querySelector(".gallery").innerHTML = "";
  //SELECTION LE PARENT GALLERY
  const gallery = document.querySelector(".gallery");

  //BOUCLE FOR POUR FAIRE DEFILER LES IMAGE LE TEXTE ET LES ALT JUSQUA FIN DU TABLEAU (LENGTH)
  for (let i = 0; i < filtered.length; i++) {
    
    //CREATION BALISE IMAGE
    const img = document.createElement("img");

    //AJOUT DES IMAGES ET DES ALT A PARTIR DE L'API A L'HTML
    img.src = filtered[i].imageUrl;
    img.alt = filtered[i].title;

    //CREATION DES BALISES FIGURE ET FIGCAPTION
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");

    //AJOUT DES TITRES SOUS CHAQUES IMAGE A PARTIR DE L'API A L'HTML
    figcaption.innerText = filtered[i].title;

    //AJOUT DES BALISE IMG ET FIGCAPTION DANS LA BALISE FIGURE
    figure.appendChild(img);
    figure.appendChild(figcaption);

    //AJOUT DES BALISES FIGURE AU PARENT
    gallery.appendChild(figure);
  }
}

//--------------------------------------------------LOGIN LOGOUT---------------------------------
//TRANSFORMER LE LOGIN EN LOGOUT

//SI ON EST CONNECTER
if (localStorage.getItem("token")) {

  //CREE UN LELEMENT
  const logout = document.createElement("li");
  logout.innerText = "logout";
  logout.id = "idLogout";
  logout.style.cursor = "pointer";

  //SELECTIONNER LE PARENT DE LA LISTE
  const login = document.querySelector("#login");

  //AJOUTER LELEMENT LOGOUT A LHTML
  login.insertAdjacentElement("afterend", logout);

  //SUPPRIMER LE LOGIN POUR LE REMPLACER PAR LE LOGOUT
  login.remove();

  //MASQUER LES FILTRES
  button_align.style.visibility = "hidden";

  //SELECTIONNER LE BANDEAU
  const headband = document.querySelector(".headband");
  const modify_button = document.querySelector(".modify_icon");

  //AFFICHER LE BANDEAU
  headband.style.display = "flex";
  modify_button.style.display = "block";

  //-------------------------------------------------SE DECONNECTER------------------------------

  //AJOUTE UN ECOUTEUR
  logout.addEventListener("click", function () {    

    //SUPPRIME LE TOKEN
    localStorage.removeItem("token");
    
    //RECHARGE LA PAGE POUR RECUPERER LE LI LOGIN
    location.reload();
  });
}
