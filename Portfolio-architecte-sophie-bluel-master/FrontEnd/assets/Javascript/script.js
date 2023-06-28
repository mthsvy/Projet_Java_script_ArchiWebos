//Récuperation des projets de l'architecte avec fetch
async function fetchData() {
  const response = await fetch("http://localhost:5678/api/works");
  const projets = await response.json();

  //SELECTION LE PARENT GALLERY
  const gallery = document.querySelector(".gallery");

  for (let i = 0; i < projets.length; i++) {
    //CREATION BALISE IMAGE
    const img = document.createElement("img");

    //AJOUT DES IMAGES ET DES ALT A PARTIR DE L'API A LHTML
    img.src = projets[i].imageUrl;
    img.alt = projets[i].title;      

    //CREATION DES BALISES FIGURE ET FIGCAPTION
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");


    figcaption.innerText = projets[i].title;  

    //AJOUT DES BALISE IMG ET FIGCAPTION DANS LA BALISE FIGURE
    figure.appendChild(img);
    figure.appendChild(figcaption);

    //AJOUT DES BALISES FIGURE AU PARENT
    gallery.appendChild(figure);
  }
}
fetchData();
