let imcProjet = document.querySelector(".imc")
let todoProjet = document.querySelector(".todo")
let penduProjet = document.querySelector(".pendu")
let morpionProjet = document.querySelector(".morpion")
let catchmeProjet = document.querySelector(".catchme")
let schoolProjet = document.querySelector(".school")
imcProjet.style.display = "none"
todoProjet.style.display = "none"
penduProjet.style.display = "none"
morpionProjet.style.display = "none"
catchmeProjet.style.display = "none"
schoolProjet.style.display = "none"







const routes = {
    index: "/",
    indexhtml: "/index.html",
    apropos: "/a-propos",
    competence: "/competence",
    formations: "/formations",
    experiences: "/experiences",
    projets: "/projets",
    contact: "/contact"
};

const app = document.querySelector("#app");
const title = document.querySelector("#title");

function handleLinks() {
    let links = document.querySelectorAll("a[data-target]");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute("data-target");
            window.history.pushState({}, "", target);
            router();
        });
    });
}

function typeWriter(element, text, speed) {
    element.innerHTML = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

async function router() {
    const path = location.pathname;
    app.classList.remove("fade-in");
    app.classList.add("fade");

    let page = "";
    switch (path) {
        case routes.index:
            page = "./pages/apropos.html";
            break;
        case routes.indexhtml:
            page = "./pages/apropos.html";
            break;
        case routes.apropos:
            page = "./pages/apropos.html";
            break;
        case routes.competence:
            page = "./pages/competence.html";
            break;
        case routes.formations:
            page = "./pages/formation.html";
            break;
        case routes.experiences:
            page = "./pages/experience.html";
            break;
        case routes.projets:
            page = "./pages/projet.html";
            break;
        case routes.contact:
            page = "./pages/contact.html";
            break;
        default:
            app.innerHTML = "<h1>404 - Page Not Found</h1>";
            return;
    }

    try {
        const response = await fetch(page);
        const text = await response.text();
        app.innerHTML = text;
        app.classList.add("fade-in");
        if (location.pathname === routes.projets) {
            const buttons = document.querySelectorAll(".btn");

            buttons.forEach(button => {
                button.addEventListener("click", () => {
                    let buttonText = button.innerHTML;
                    projetTitle.innerText = buttonText;
                });
            });
        }
    } catch (error) {
        app.innerHTML = "<h1>Error loading page</h1>";
        console.error("Error fetching page:", error);
    }
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    router();
    handleLinks();
    typeWriter(title, title.textContent, 100);


});

function modale() {
    const mainContainer = document.querySelector(".main-container");
    const modaleSection = document.querySelector(".modale-section");
    const closeBtn = document.querySelector(".close");

    // Affiche la modale
    mainContainer.style.display = "none";
    modaleSection.style.display = "block";

    // Ajoute un écouteur d'événement pour le bouton de fermeture
    closeBtn.addEventListener("click", () => {
        mainContainer.style.display = "block";
        modaleSection.style.display = "none";
        imcProjet.style.display = "none"
        todoProjet.style.display = "none"
        penduProjet.style.display = "none"
        morpionProjet.style.display = "none"
        catchmeProjet.style.display = "none"
        schoolProjet.style.display = "none"

    });

    // Appel la fonction pushTitle() après que la modale a été affichée
    pushTitle();
}

function pushTitle() {

    const projetTitle = document.querySelector("#projetTitle");

    if (projetTitle === null) {
        console.error("Élément #projetTitle non trouvé!");
        return;
    }


}

// FONCTION TO DO LIST

function createArticle() {
    let title = document.querySelector("#toDoTitle").value
    let textArea = document.querySelector("#details").value

    let newTask = document.createElement("article")
    let newTitle = document.createElement("h2")
    let newDetails = document.createElement("p")
    let removeButton = document.createElement("button")
    removeButton.innerHTML = "Supprimer"
    removeButton.addEventListener("click", () => {
        newTask.remove()
    })

    newTitle.innerHTML = title
    newDetails.innerHTML = textArea

    newTask.appendChild(newTitle)
    newTask.appendChild(newDetails)
    newTask.appendChild(removeButton)
    createHere.appendChild(newTask)

}

// Fonction IMC 
function imc() {
    let taille = parseFloat(document.querySelector("#taille").value);
    let poids = parseFloat(document.querySelector("#poid").value);
    let imc = document.querySelector("#res");
    let interpretation = document.querySelector("#inter");

    // Vérification des valeurs négatives ou invalides
    if (isNaN(taille) || isNaN(poids) || taille <= 0 || poids <= 0) {
        alert("Entrez une valeur valide");
        imc.innerHTML = "Valeurs incorrectes";
        interpretation.innerHTML = "Merci d'entrez une valeur valide";
        return;
    }

    // Calcul de l'IMC
    let resultat = poids / (taille * taille);
    imc.innerHTML = resultat.toFixed(2);

    // Interprétation de l'IMC
    if (resultat < 18.5) {
        interpretation.innerHTML = "Vous êtes en insuffisance pondérale";
    } else if (resultat < 25) {
        interpretation.innerHTML = "Vous avez un poids normal";
    } else if (resultat < 30) {
        interpretation.innerHTML = "Vous êtes en surpoids";
    } else {
        interpretation.innerHTML = "Vous êtes obèse";
    }
}


// JEUX DU PENDU 
// JEUX DU PENDU 
let guessWord = document.querySelector("#guess")
let usedLetters = document.querySelector("#used")
let currentWord = null
let usedTab = []
let wordTab = ["XYLOPHONISTE", "HYPOTHALAMUS", "COCCYX", "ACCORDÉON", "HOROSCOPE", "ZYGOMATIQUE", "PRINTEMPS"]
let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let keybord = document.querySelector("#keybord")
let clickAudio = new Audio("./assets/sounds/click.mp3")
let lifeScore = document.querySelector("#life")
let endMessage = document.querySelector("#endMessage")
let count = 10

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function pushWord() {
    let randomWord = random(0, wordTab.length)
    currentWord = wordTab[randomWord]
    guessWord.innerHTML = ""
    for (let i = 0; i < currentWord.length; i++) {
        let span = document.createElement("span")
        span.innerHTML = ' _ '
        guessWord.appendChild(span)
    }
}

pushWord()

function createButton(tab) {
    for (let i = 0; i < tab.length; i++) {
        let button = document.createElement("button")
        button.innerHTML = tab[i]
        keybord.appendChild(button)

        button.addEventListener("click", () => {
            button.disabled = true
            clickAudio.play()

            if (!usedTab.includes(button.innerHTML)) {
                usedTab.push(button.innerHTML)
                usedLetters.innerHTML = usedTab.join(", ")

                let found = false
                for (let j = 0; j < currentWord.length; j++) {
                    if (button.innerHTML === currentWord[j]) {
                        guessWord.children[j].innerHTML = button.innerHTML
                        found = true
                    }
                }

                if (!found) {
                    count--
                    lifeScore.innerHTML = "Coups restants: " + count
                }

                // Vérifiez si l'utilisateur a gagné
                if (Array.from(guessWord.children).every(span => span.innerHTML !== ' _ ')) {
                    endMessage.innerHTML = "Félicitations ! Vous avez gagné !"
                    keybord.innerHTML = "" // Désactive les boutons
                }

                // Vérifiez si l'utilisateur a perdu
                if (count === 0) {
                    endMessage.innerHTML = "Dommage ! Vous avez perdu. Le mot était " + currentWord
                    keybord.innerHTML = "" // Désactive les boutons
                }
            }
        })
    }
}

lifeScore.innerHTML = "Coups restants: " + count
createButton(letters)


function imcActivate() {
    imcProjet.style.display = "block"
}

function todoActivate() {
    todoProjet.style.display = "block"
}

function penduActivate() {
    penduProjet.style.display = "block"
}

function morpionActivate() {
    morpionProjet.style.display = "block"
}
function catchmeActivate() {
    catchmeProjet.style.display = "block"
}
function schoolActivate() {
    schoolProjet.style.display = "block"
}


// carroussel 

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const leftButton = document.querySelector(".left");
    const rightButton = document.querySelector(".right");
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    leftButton.addEventListener("click", prevSlide);
    rightButton.addEventListener("click", nextSlide);

    // Initial display
    showSlide(currentIndex);
});



document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    const downButton = document.querySelector(".down");

    let currentIndex = 0;
    let isSmallScreen = false;

    // Vérifier la taille de l'écran au chargement de la page
    checkScreenSize();

    // Fonction pour vérifier la taille de l'écran
    function checkScreenSize() {
        const mediaQuery = window.matchMedia("(max-width: 1000px)");

        if (mediaQuery.matches) {
            isSmallScreen = true;
            // Activer le carrousel sur les petits écrans
            setupCarousel();
        } else {
            isSmallScreen = false;
            // Désactiver le carrousel sur les grands écrans
            teardownCarousel();
        }

        // Écouter les changements de taille d'écran
        mediaQuery.addListener(function() {
            if (mediaQuery.matches) {
                isSmallScreen = true;
                setupCarousel();
            } else {
                isSmallScreen = false;
                teardownCarousel();
            }
        });
    }

    // Fonction pour configurer le carrousel
    function setupCarousel() {
        showSlide(currentIndex);

        downButton.addEventListener("click", function() {
            hideCurrentSlide();
            currentIndex++;
            showSlide(currentIndex);
        });
    }

    // Fonction pour désactiver le carrousel
    function teardownCarousel() {
        downButton.removeEventListener("click", function() {
            hideCurrentSlide();
            currentIndex++;
            showSlide(currentIndex);
        });
    }

    // Fonction pour afficher un slide spécifique avec animation
    function showSlide(index) {
        // Gestion des limites de l'index
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        // Cacher tous les slides
        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        // Afficher le nouveau slide avec une légère temporisation
        setTimeout(function() {
            slides[index].classList.add("active");
        }, 100);

        // Mettre à jour l'index courant
        currentIndex = index;
    }

    // Fonction pour cacher le slide actuel
    function hideCurrentSlide() {
        slides[currentIndex].classList.remove("active");
    }
});
