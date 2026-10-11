let formulaire = document.getElementById("formulaire");
let champSaisie = document. getElementById("addTache");
let conteneurTaches = document.getElementById("conteneurTaches");
let filtreActuel = "Toutes";
let boutonFiltreToutes = document.getElementById("filtreToutes");
let boutonFiltreEnCours = document.getElementById("filtreEnCours");
let boutonFiltreTerminees = document.getElementById("filtreTerminees");
boutonFiltreToutes.addEventListener("click", () => {
    filtreActuel = "toutes";
    afficherTaches();
});
boutonFiltreEnCours.addEventListener("click", () => {
    filtreActuel = "en cours";
    afficherTaches();
});
boutonFiltreTerminees.addEventListener("click", () => {
    filtreActuel = "terminées";
    afficherTaches();
});
console.log(formulaire);
console.log(champSaisie);
console.log(conteneurTaches);

let valeurChamps = champSaisie.value;
let listTaches = [];
let idSuivant = 1;
function ajouterTache(valeurChamps){
    let tache = {
        id: idSuivant,
        nom: valeurChamps,
        etat:false
    };
    listTaches.push(tache);
    idSuivant++;
}
console.log(listTaches);

formulaire.addEventListener("submit", (event) =>{
    event.preventDefault(); 
    let valeurChamps = champSaisie.value;
    let valeurChampsSansEsp = valeurChamps.trim();
    if (valeurChampsSansEsp === "") {
        alert("tache vide !")
        return;
    }
    ajouterTache(valeurChampsSansEsp);
    afficherTaches();
    champSaisie.value = "";
});
// let paragraphe = document.createElement("p");
// paragraphe.textContent = "Apprendre JavaScript";
// conteneurTaches.appendChild(paragraphe);
function afficherTaches(){
    conteneurTaches.textContent = "";
    for (let index = 0; index < listTaches.length; index++) {
        let tacheActuelle = listTaches[index];
        
        if (filtreActuel === "en cours" && tacheActuelle.etat === true) {
            continue;
        }
        if (filtreActuel === "terminées" && tacheActuelle.etat === false) {
            continue;
        }

        
        let parag = document.createElement("p");
        let carteTache = document.createElement("div");
        carteTache.classList.add("tache");
        parag.textContent = tacheActuelle.nom;
        if (tacheActuelle.etat === true) {
            parag.style.textDecoration = "line-through";
        }
        carteTache.appendChild(parag);
        conteneurTaches.appendChild(carteTache);

        let boutonSupprimer = document.createElement("button");
        boutonSupprimer.classList.add("bouton-supprimer");
        boutonSupprimer.textContent = "Supprimer";
        boutonSupprimer.addEventListener("click",() => {
        supprimerTache(tacheActuelle.id);
        });
        carteTache.appendChild(boutonSupprimer);

        let boutonTerminer = document.createElement("button");
        boutonTerminer.classList.add("bouton-terminer");
        if (tacheActuelle.etat === true) {
            boutonTerminer.textContent = "Réactiver";
        } else {
            boutonTerminer.textContent = "Terminer";
        }
        //boutonTerminer.textContent = "Terminer";
        boutonTerminer.addEventListener("click", () => {
            tacheActuelle.etat = !tacheActuelle.etat;
            afficherTaches();
        });
        carteTache.appendChild(boutonTerminer);
    }
    afficherCompteur();
    sauvegarderTaches();
}
function supprimerTache(id) {
    let indexTache = listTaches.findIndex(function(tache) {
        return tache.id === id;
    });
    if (indexTache === -1) {
        return;
    }
    listTaches.splice(indexTache,1);
    afficherTaches();
}
function compterTachesRestantes() {
    let compteur = 0;

    for (let index = 0; index < listTaches.length; index++) {
        if (listTaches[index].etat === false) {
            if (filtreActuel === "toutes" || filtreActuel === "en cours") {
                compteur++;
            }
        }
    }
    return compteur;
}
let paragCompteur = document.getElementById("compteurTaches");
function afficherCompteur() {
    paragCompteur.textContent = compterTachesRestantes();
}
function sauvegarderTaches() {
    localStorage.setItem("mesTaches", JSON.stringify(listTaches));
}
function chargerTaches() {
    let donnees = JSON.parse(localStorage.getItem("mesTaches"));
    if (donnees !== null) {
        listTaches = donnees;
    }
    let max = 0;
    for (let index = 0; index < listTaches.length; index++) {
        if (listTaches[index].id > max) {
            max = listTaches[index].id;
        }
    }
    idSuivant = max + 1;
}
chargerTaches();
afficherTaches();