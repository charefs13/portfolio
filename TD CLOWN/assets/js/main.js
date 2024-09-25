let target = document.querySelector("#target");
let count = document.querySelector("#count");
let timmer = document.querySelector("#timmer");
let score = 0;
let difficulty = document.querySelectorAll("input[name='difficulty']");
let easy = document.querySelector("#easy");
let normal = document.querySelector("#normal");
let impossible = document.querySelector("#impossible");
let time = 30;
let intervalID = null;
let moveIntervalID = null;
let end = document.querySelector(".end")
let bgSound = new Audio("./sounds/theme.mp3")
bgSound.play()


function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function mooveTarget() {                // déplacement aléatoire
    if (time > 0) {
        let randomY = random(0, 80);
        let randomX = random(0, 90);
        target.style.top = randomY + "%";
        target.style.left = randomX + "%";
    }

}

function startCountdown() {              
    end.style.display = "none"                        // cacher mon message de fin
    intervalID = setInterval(() => {
        if (time > 0) {                               // compte à rebours au début de la partie
            time--;
            timmer.innerHTML = "Temps: " + time;
        } else {                                    // fin de la partie
            clearInterval(intervalID);                 
            clearTimeout()
            end.style.display = "flex"                // reveler mon message de fin
            endMsg.innerHTML = "Partie terminée, votre score est " + score   
        }
    }, 1000);
}

function resetGame() {
    // Vérifie si l'intervalle de temps (pour le compte à rebours) est actif
    if (intervalID) {
        clearInterval(intervalID);  // Si oui, arrête cet intervalle
        intervalID = null;  // Réinitialise la variable intervalID à null
    }

    // Vérifie si l'intervalle de déplacement de la cible est actif
    if (moveIntervalID) {
        clearInterval(moveIntervalID);  // Si oui, arrête cet intervalle
        moveIntervalID = null;  // Réinitialise la variable moveIntervalID à null
    }

    time = 30;  // Réinitialise le temps à 30 secondes
    timmer.innerHTML = "Temps: " + time;  // Met à jour l'affichage du temps sur l'interface utilisateur
    startCountdown();  // Redémarre le compte à rebours en appelant la fonction startCountdown()
}


function easySpeed() {
    resetGame();
    moveIntervalID = setInterval(mooveTarget, 1500);  // Modifier l'intervalle de déplacement pour facile
}

function normalSpeed() {
    resetGame();
    moveIntervalID = setInterval(mooveTarget, 1000);  // Modifier l'intervalle de déplacement pour normal
}

function impossibleSpeed() {
    resetGame();
    moveIntervalID = setInterval(mooveTarget, 500);  // Modifier l'intervalle de déplacement pour impossible
}

easy.addEventListener("click", easySpeed);
normal.addEventListener("click", normalSpeed);
impossible.addEventListener("click", impossibleSpeed);

function playSound() {                                  // son au click
    let myAudio = document.querySelector("#myAudio");
    myAudio.play();
}
target.addEventListener("click", playSound);


function playTheme() {                                  //  musique de fond
    bgSound.play()
}

function clickCount() {                                 // compteur score au click
    score++;
    count.innerHTML = "Score: " + score;
}
target.addEventListener("click", clickCount);


moveIntervalID = setInterval(mooveTarget, 1000);  // Intervalle par défaut pour la difficulté normale
startCountdown();  // Démarrer le compte à rebours par défaut


