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

    //AJOUT DES TITEZ SOUS CHAQUES IMAGE A PARTIR DE L'API A L'HTML
    figcaption.innerText = projets[i].title;

    //AJOUT DES BALISE IMG ET FIGCAPTION DANS LA BALISE FIGURE
    figure.appendChild(img);
    figure.appendChild(figcaption);

    //AJOUT DES BALISES FIGURE AU PARENT
    gallery.appendChild(figure);
  }
}

fetchData();

//CREATION BALISE BUTTON
const btn_tous = document.createElement("button");
const btn_objets = document.createElement("button");
const btn_appartements = document.createElement("button");
const btn_hotel_restaurant = document.createElement("button");

//AJOUT DES CLASSE AU BOUTTON
btn_tous.classList.add("button_color");
btn_objets.classList.add("button_color");
btn_appartements.classList.add("button_color");
btn_hotel_restaurant.classList.add("button_color");

//AJOUT DU TEXTE AU BOUTON
btn_tous.innerText = "Tous";
btn_objets.innerText = "Objets";
btn_appartements.innerText = "Appartements";
btn_hotel_restaurant.innerText = "Hôtel & Restaurant";

//CREATION DE LA BALISE PARENT DIV BUTTON ALIGN
const button_align = document.createElement("div");

//AJOUT DES BOUTON DANS LE PARENT
button_align.appendChild(btn_tous);
button_align.appendChild(btn_objets);
button_align.appendChild(btn_appartements);
button_align.appendChild(btn_hotel_restaurant);

//AJOUT DE LA CLASSE AU PARENT
button_align.classList.add("button_align");

//SELECTIONNER LELEMENT OU AJOUTER LE PARENT
const position = document.querySelector("#portfolio h2");

//ON AJOUTE LE PARENT DANS LE HMTL VIA A LA POSITION DEFINI JUSTE AVANT
position.insertAdjacentElement("afterend", button_align);

//CREATION DES FILTRE

//AJOUT DUN EVENLISTENER
btn_tous.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  fetchData();
});

//AJOUT DUN EVENLISTENER POUR LES OBJETS
btn_objets.addEventListener("click", async function () {
  const response = await fetch("http://localhost:5678/api/works");
  const projets = await response.json();
  const objets = projets.filter(function (projet) {
    return projet.category.name === "Objets";
  });

  document.querySelector(".gallery").innerHTML = "";
  //SELECTION LE PARENT GALLERY
  const gallery = document.querySelector(".gallery");

  //BOUCLE FOR POUR FAIRE DEFILER LES IMAGE LE TEXTE ET LES ALT JUSQUA FIN DU TABLEAU (LENGTH)
  for (let i = 0; i < objets.length; i++) {
    //CREATION BALISE IMAGE
    const img = document.createElement("img");

    //AJOUT DES IMAGES ET DES ALT A PARTIR DE L'API A L'HTML
    img.src = objets[i].imageUrl;
    img.alt = objets[i].title;

    //CREATION DES BALISES FIGURE ET FIGCAPTION
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");

    //AJOUT DES TITEZ SOUS CHAQUES IMAGE A PARTIR DE L'API A L'HTML
    figcaption.innerText = objets[i].title;

    //AJOUT DES BALISE IMG ET FIGCAPTION DANS LA BALISE FIGURE
    figure.appendChild(img);
    figure.appendChild(figcaption);

    //AJOUT DES BALISES FIGURE AU PARENT
    gallery.appendChild(figure);
  }
});

//AJOUT DUN EVENLISTENER POUR LES APPARTEMENTS
btn_appartements.addEventListener("click", async function () {
  const response = await fetch("http://localhost:5678/api/works");
  const projets = await response.json();
  const appartements = projets.filter(function (projet) {
    return projet.category.name === "Appartements";
  });

  document.querySelector(".gallery").innerHTML = "";
  //SELECTION LE PARENT GALLERY
  const gallery = document.querySelector(".gallery");

  //BOUCLE FOR POUR FAIRE DEFILER LES IMAGE LE TEXTE ET LES ALT JUSQUA FIN DU TABLEAU (LENGTH)
  for (let i = 0; i < appartements.length; i++) {
    //CREATION BALISE IMAGE
    const img = document.createElement("img");

    //AJOUT DES IMAGES ET DES ALT A PARTIR DE L'API A L'HTML
    img.src = appartements[i].imageUrl;
    img.alt = appartements[i].title;

    //CREATION DES BALISES FIGURE ET FIGCAPTION
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");

    //AJOUT DES TITEZ SOUS CHAQUES IMAGE A PARTIR DE L'API A L'HTML
    figcaption.innerText = appartements[i].title;

    //AJOUT DES BALISE IMG ET FIGCAPTION DANS LA BALISE FIGURE
    figure.appendChild(img);
    figure.appendChild(figcaption);

    //AJOUT DES BALISES FIGURE AU PARENT
    gallery.appendChild(figure);
  }
});

//AJOUT DUN EVENLISTENER POUR LES HOTEL & RESTAURANTS
btn_hotel_restaurant.addEventListener("click", async function () {
  const response = await fetch("http://localhost:5678/api/works");
  const projets = await response.json();
  const btn_hotel_restaurant = projets.filter(function (projet) {
    return projet.category.name === "Hotels & restaurants";
  });

  document.querySelector(".gallery").innerHTML = "";
  //SELECTION LE PARENT GALLERY
  const gallery = document.querySelector(".gallery");

  //BOUCLE FOR POUR FAIRE DEFILER LES IMAGE LE TEXTE ET LES ALT JUSQUA FIN DU TABLEAU (LENGTH)
  for (let i = 0; i < btn_hotel_restaurant.length; i++) {
    //CREATION BALISE IMAGE
    const img = document.createElement("img");

    //AJOUT DES IMAGES ET DES ALT A PARTIR DE L'API A L'HTML
    img.src = btn_hotel_restaurant[i].imageUrl;
    img.alt = btn_hotel_restaurant[i].title;

    //CREATION DES BALISES FIGURE ET FIGCAPTION
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");

    //AJOUT DES TITEZ SOUS CHAQUES IMAGE A PARTIR DE L'API A L'HTML
    figcaption.innerText = btn_hotel_restaurant[i].title;

    //AJOUT DES BALISE IMG ET FIGCAPTION DANS LA BALISE FIGURE
    figure.appendChild(img);
    figure.appendChild(figcaption);

    //AJOUT DES BALISES FIGURE AU PARENT
    gallery.appendChild(figure);
  }
});
