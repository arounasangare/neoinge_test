// Définition des phases et tâches
const phases = [
    {
        name: "Ingénieur Civil",
        duration: 60 * 60, // 1 h
        tasks: [
            "Analyse et Validation des plans et documents.",
            "Réalisation de la conception conformément aux plans ou instructions de l'architecte.",
            "Modélisation de la conception sur Robot Structural Analysis.",
            "Application des charges, analyse du modèle et vérification des éléments de structuration."
        ]
    },
    {
        name: "Ingénieur Civil",
        duration: 10 * 60, // 30 minutes
        tasks: ["Vérification"]
    },
];

let currentPhaseIndex = 0;
let timeRemaining = phases[currentPhaseIndex].duration;
let timerInterval = null;
let isRunning = false;

const phaseElement = document.getElementById('phase');
const timerElement = document.getElementById('timer');
const activitiesElement = document.getElementById('activities');
const messageElement = document.getElementById('message');
const controlButton = document.getElementById('controlButton');
const nextPhaseButton = document.getElementById('nextPhaseButton');

// Mettre à jour le timer
function updateTimer() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    timerElement.textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeRemaining > 0) {
        timeRemaining--;
    } else {
        clearInterval(timerInterval);
        nextPhase();
    }
}

// Mettre à jour l'affichage des tâches
function updateActivities() {
    const tasks = phases[currentPhaseIndex].tasks;
    activitiesElement.innerHTML = `
        <ul>
            ${tasks.map(task => `<li>${task}</li>`).join('')}
        </ul>
    `;
}

// Passer à la phase suivante
function nextPhase() {
    currentPhaseIndex++;
    if (currentPhaseIndex < phases.length) {
        timeRemaining = phases[currentPhaseIndex].duration;
        phaseElement.textContent = phases[currentPhaseIndex].name;
        updateActivities();
        updateTimer();
        if (isRunning) {
            startTimer();
        }
    } else {
        phaseElement.textContent = "Fin";
        timerElement.textContent = "00:00";
        messageElement.textContent = "Test terminé !";
        controlButton.disabled = true;
        nextPhaseButton.disabled = true;
    }
}

// Démarrer le compte à rebours
function startTimer() {
    if (!isRunning) {
        timerInterval = setInterval(updateTimer, 1000);
        isRunning = true;
        controlButton.textContent = "Arrêter";
        nextPhaseButton.disabled = false; // Activer le bouton Phase Suivante
    }
}

// Arrêter le compte à rebours
function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    controlButton.textContent = "Démarrer";
    nextPhaseButton.disabled = true; // Désactiver le bouton Phase Suivante
}

// Gestion du bouton Démarrer/Arrêter
controlButton.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
    } else {
        if (currentPhaseIndex === 0 && timeRemaining === phases[0].duration) {
            phaseElement.textContent = phases[currentPhaseIndex].name;
            updateActivities();
        }
        startTimer();
    }
});

// Gestion du bouton Phase Suivante
nextPhaseButton.addEventListener('click', () => {
    stopTimer();
    nextPhase();
});

// Initialiser l'affichage de la première phase
function initialize() {
    phaseElement.textContent = phases[currentPhaseIndex].name;
    updateActivities();
    updateTimer();
}

initialize();

// Ajouter un effet lorsque le test est terminé
function showCompletionEffect() {
    document.body.classList.add('finished'); // Ajouter une classe pour l'animation
    messageElement.innerHTML = "🎉 Test terminé avec succès ! 🎉"; // Message de fin
    messageElement.style.fontSize = "2rem";
    messageElement.style.color = "#FF5733";
}

// Modifier la fonction `nextPhase` pour inclure l'effet
function nextPhase() {
    currentPhaseIndex++;
    if (currentPhaseIndex < phases.length) {
        timeRemaining = phases[currentPhaseIndex].duration;
        phaseElement.textContent = phases[currentPhaseIndex].name;
        updateActivities();
        updateTimer();
        if (isRunning) {
            startTimer();
        }
    } else {
        phaseElement.textContent = "Fin";
        timerElement.textContent = "00:00";
        showCompletionEffect(); // Ajouter l'effet ici
        controlButton.disabled = true;
        nextPhaseButton.disabled = true;
    }
}

// Ajouter un effet sonore lorsque le test est terminé
function playCompletionSound() {
    const audio = document.getElementById('completionSound');
    audio.play(); // Joue le son
}

// Modifier la fonction `showCompletionEffect` pour inclure le son
function showCompletionEffect() {
    document.body.classList.add('finished'); // Ajouter une classe pour l'animation
    messageElement.innerHTML = "🎉 Test terminé avec succès ! 🎉"; // Message de fin
    messageElement.style.fontSize = "2rem";
    messageElement.style.color = "#FF5733";

    playCompletionSound(); // Jouer le son de notification
}
