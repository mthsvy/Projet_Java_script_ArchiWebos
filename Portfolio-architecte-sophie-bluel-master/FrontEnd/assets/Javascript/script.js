//Récuperation des projets de l'architecte avec fetch
async function fetchData() {
  const response = await fetch("http://localhost:5678/api/works");
  const projets = await response.json();

  //SELECTION LE PARENT GALLERY
  const gallery = document.querySelector(".gallery");

  //BOUCLE FOR POUR FAIRE DEFILER LES IMAGE LE TEXTE ET LES ALT JUSQUA FIN DU TABLEAU (LENGTH)
  for (let i = 0; i < projets.length; i++) {
    //CREATION BALISE IMAGE
    const img = document.createElement("img");

    //AJOUT DES IMAGES ET DES ALT A PARTIR DE L'API A L'HTML
    img.src = projets[i].imageUrl;
    img.alt = projets[i].title;

    //CREATION DES BALISES FIGURE ET FIGCAPTION
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");

    //AJOUT DES TITRE SOUS CHAQUES IMAGE A PARTIR DE L'API A L'HTML
    figcaption.innerText = projets[i].title;

    //AJOUT DES BALISE IMG ET FIGCAPTION DANS LA BALISE FIGURE
    figure.appendChild(img);
    figure.appendChild(figcaption);

    //AJOUT DES BALISES FIGURE AU PARENT
    gallery.appendChild(figure);
  }
}

fetchData();

//CREATION DE LA BALISE PARENT DIV BUTTON ALIGN
const button_align = document.createElement("div");

//CREATION DU BOUTON TOUS
const btn_tous = document.createElement("button");
btn_tous.classList.add("button_color");
btn_tous.innerText = "Tous";
button_align.appendChild(btn_tous);
btn_tous.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  fetchData();
});

//AFFICHAGE DES BOUTONS DES CATEGORIES A PARTIR DE LAPI
async function getCategorie() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categorie = await response.json();
  for (let i = 0; i < categorie.length; i++) {
    const btn = document.createElement("button");
    btn.classList.add("button_color");
    btn.innerText = categorie[i].name;
    button_align.appendChild(btn);
    btn.addEventListener("click", function () {
      afficherProjetsParCategorie(categorie[i].name);
    });
  }
}

getCategorie();

//AJOUT DE LA CLASSE AU PARENT
button_align.classList.add("button_align");

//SELECTIONNER LELEMENT OU AJOUTER LE PARENT
const position = document.querySelector(".align_modify");

//ON AJOUTE LE PARENT DANS LE HMTL VIA LA POSITION DEFINI JUSTE AVANT
position.insertAdjacentElement("afterend", button_align);

//FACTORISER
async function afficherProjetsParCategorie(categories) {
  const response = await fetch("http://localhost:5678/api/works");
  const projets = await response.json();
  const projets_filtree = projets.filter(function (projet) {
    return projet.category.name === categories;
  });

   document.querySelector(".gallery").innerHTML = "";
  //SELECTION LE PARENT GALLERY
  const gallery = document.querySelector(".gallery");

  //BOUCLE FOR POUR FAIRE DEFILER LES IMAGE LE TEXTE ET LES ALT JUSQUA FIN DU TABLEAU (LENGTH)
  for (let i = 0; i < projets_filtree.length; i++) {
    //CREATION BALISE IMAGE
    const img = document.createElement("img");

    //AJOUT DES IMAGES ET DES ALT A PARTIR DE L'API A L'HTML
    img.src = projets_filtree[i].imageUrl;
    img.alt = projets_filtree[i].title;

    //CREATION DES BALISES FIGURE ET FIGCAPTION
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");

    //AJOUT DES TITRES SOUS CHAQUES IMAGE A PARTIR DE L'API A L'HTML
    figcaption.innerText = projets_filtree[i].title;

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
    //REACHARGE LA PAGE POUR RECUPERER LE LI LOGIN
    location.reload();

    //SUPPRIME LE TOKEN
    localStorage.removeItem("token");
  });
}
