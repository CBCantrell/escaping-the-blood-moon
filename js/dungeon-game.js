
/*
 * File: dungeon-game.js
 * Project: Escaping the Blood Moon: The Keeper's Curse
 * Course: WEB115
 * Author: Christie Cantrell
 * Date Created: November 24, 2026
 *
 * Description:
 * Handles the interactive gameplay, including story progression,
 * dungeon exploration, inventory, clues, puzzles, countdown timer,
 * and branching endings.
 *
 * Team Project:
 * Kris Fulk - HTML and visual assets
 * Maria Moncayo - CSS and narrative
 * Christie Cantrell - JavaScript and game integration
 */

"use strict";

// Requirement A: Store references to HTML elements using the DOM.
const storyImage = document.getElementById("story-image");
const scrollButton = document.getElementById("scroll");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

// Requirement A: Reference the key-related HTML elements.
const rubbleButton = document.getElementById("rubble");
const keyButton = document.getElementById("key");
const inventoryList = document.getElementById("inventory");

// Requirement A: Reference the Moonstone button.
const moonstoneButton = document.getElementById("moonstone");

// Requirement A: Reference the journal container.
const journalList = document.getElementById("journal-list");

// Requirement A: Reference the books button.
const booksButton = document.getElementById("books");

// Requirement A: Reference the remaining examinable objects.
const lettersButton = document.getElementById("letters");
const shacklesButton = document.getElementById("shackles");
const skeletonButton = document.getElementById("skeleton");
const ratButton = document.getElementById("rat");

// Requirement A: Reference the crystal ball and hint counter.
const crystalBallButton = document.getElementById("crystal-ball");
const questionsUsedDisplay = document.getElementById("questions-used");

// Requirement A: Reference the door, choices, and name-entry elements.
const doorButton = document.getElementById("door");
const escapeButton = document.getElementById("escape-button");
const speakButton = document.getElementById("speak-button");
const leaveButton = document.getElementById("leave-button");
const exploreButton = document.getElementById("explore-button");
const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("name-input");

const paragraph1 = document.getElementById("paragraph1");
const paragraph2 = document.getElementById("paragraph2");
const paragraph3 = document.getElementById("paragraph3");

const dungeonItems = document.getElementById("items");
const stats = document.getElementById("stats");
const wallSound = document.getElementById("wall-sound");

// Requirement Q: Audio for the introduction, gameplay, and endings.
const introMusic = new Audio("audio/intro.mp3");
const gameplayMusic = new Audio("audio/gameplay.mp3");
const outroMusic = new Audio("audio/outro.mp3");

// Requirement Q: Sound effect for escaping through the locked dungeon door.
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
const doorEscapeSound = new Audio("audio/door-escape.mp3");

// Requirement A: Reference the spiderweb button.
const spiderwebButton = document.getElementById("spiderweb");

// Requirements A, O, and U:
// Reference the Secrets Revealed display and track discoveries.
const scoreDisplay = document.getElementById("discovery-score");
let discoveryCount = 0;

// Track which discoveries have already increased progress.
const revealedSecrets = new Set();

// Requirement U: Track gameplay phases to prevent actions outside the game.
let gameStarted = false;
let gameEnded = false;
let scrollOpened = false;

// Gameplay music repeats until the player reaches an ending.
gameplayMusic.loop = true;

// Keep background music quieter than sound effects.
introMusic.volume = 0.25;
gameplayMusic.volume = 0.25;
outroMusic.volume = 0.25;

// Requirements B and J: Use a function to update the story paragraphs.
function showOpeningScroll() {
    if (scrollOpened || gameStarted || gameEnded) {
        return;
    }

    scrollOpened = true;
    paragraph1.textContent = "The Moonstone lies hidden beneath this very castle...";
    paragraph2.textContent = "The Keeper has searched for it for centuries.";
    paragraph3.textContent = "Beware of the Blood Moon!";

    // Requirement L: Change an element's visibility.
    startButton.hidden = false;

    // Requirement Q: Play the introduction music when the scroll is opened.
    introMusic.currentTime = 0;
    introMusic.play().catch((error) => {
        console.warn("Introduction music could not play:", error);
    });
}

// Requirement I: Attach a click event listener to the scroll.
scrollButton.addEventListener("click", showOpeningScroll);

// Requirements B, K, and L:
// Start gameplay, change the scene image, and reveal game elements.
function startGame() {
    if (!scrollOpened || gameStarted || gameEnded) {
        return;
    }

    gameStarted = true;

    // Requirement K: Change the image using a filename argument.
    changeSceneImage("images/dungeon-lit.jpg");

    // Reveal the dungeon objects and player stats.
    dungeonItems.hidden = false;
    stats.hidden = false;

    // Hide the opening scroll and Start button.
    scrollButton.hidden = true;
    startButton.hidden = true;

    // Requirement Q: Play the sliding wall sound.
    wallSound.play().catch((error) => {
        console.warn("Wall sound could not play:", error);
    });

    // Requirement Q: Transition from introduction music to gameplay music.
    introMusic.pause();
    introMusic.currentTime = 0;

    gameplayMusic.currentTime = 0;
    gameplayMusic.play().catch((error) => {
        console.warn("Gameplay music could not play:", error);
    });

    // Requirement T: Begin the five-minute countdown.
    startCountdown();
}

// Requirement B: Reusable function that accepts an image filename.
function changeSceneImage(filename) {
    storyImage.src = filename;
}

// Requirement I: Attach the Start button event listener.
startButton.addEventListener("click", startGame);

// Requirements A and Q: Timer display and wolf warning sound.
const timeDisplay = document.getElementById("time-left");
const wolfWarning = new Audio("audio/wolf-warning.mp3");

// Requirement U: Track the countdown and warning state.
let timeRemaining = 300; // Five minutes in seconds
let timerInterval = null;
let wolfHasPlayed = false;

// Requirements B, L, Q, T, and U:
// Update the timer display and handle time-based consequences.
//
// References:
// MDN HTMLMediaElement.play:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
// MDN HTMLElement.style:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style

function updateCountdown() {
    if (!gameStarted || gameEnded) {
        return;
    }

    // Prevent the timer from displaying negative values.
    timeRemaining = Math.max(0, timeRemaining);

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    timeDisplay.textContent =
        `${minutes}:${String(seconds).padStart(2, "0")}`;

    // Requirement T: Running out of time triggers the curse immediately.
    if (timeRemaining === 0) {
        endGame("curse");
        return;
    }

    // Requirements L, Q, and U:
    // Give the ten-second warning only once.
    if (timeRemaining <= 10 && !wolfHasPlayed) {
        wolfHasPlayed = true;
        timeDisplay.style.color = "red";

        wolfWarning.currentTime = 0;
        wolfWarning.play().catch((error) => {
            console.warn("Wolf warning could not play:", error);
        });
    }
}

// Requirements B, I, T, and U:
// Apply a ten-second penalty when the player clicks the spiderweb.
//
// Reference:
// MDN addEventListener:
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

function triggerSpiderweb() {
    if (!gameStarted || gameEnded) {
        return;
    }

    hideDoorChoices();

    // Subtract ten seconds from the remaining time.
    timeRemaining -= 10;

    // Immediately update the timer and check for the wolf warning or curse.
    updateCountdown();
    if (!gameEnded) {
        paragraph1.textContent = "The spiderweb costs you ten seconds!";
    }
}

// Requirement I: Listen for the spiderweb click.
spiderwebButton.addEventListener("click", triggerSpiderweb);

// Requirements B, T, and U:
// Start the five-minute timer and update it every second.
//
// References:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval
// https://developer.mozilla.org/en-US/docs/Web/API/Window/clearInterval

function startCountdown() {
    clearInterval(timerInterval);

    timeRemaining = 300;
    wolfHasPlayed = false;
    timeDisplay.style.color = "";
    updateCountdown();

    // Requirement T: Run the countdown once per second.
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateCountdown();
    }, 1000);
}

// Requirements B, M, Q, T, and U:
// End the game, stop the timer, and transition to the ending music.
//
// References:
// MDN clearInterval:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/clearInterval
// MDN HTMLMediaElement.pause:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause
// MDN HTMLMediaElement.play:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play

function endGame(ending) {
    if (gameEnded) {
        return;
    }

    gameEnded = true;
    gameStarted = false;

    // Stop the countdown.
    clearInterval(timerInterval);
    timerInterval = null;

    // Stop gameplay sounds.
    gameplayMusic.pause();
    wolfWarning.pause();
    wolfWarning.currentTime = 0;

    // Hide interactive dungeon objects.
    dungeonItems.hidden = true;
    restartButton.hidden = false;

    // Requirements B, L, and U:
    // Hide gameplay controls when an ending is reached.
    // Reference:
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden

    escapeButton.hidden = true;
    speakButton.hidden = true;
    leaveButton.hidden = true;
    exploreButton.hidden = true;
    nameForm.hidden = true;

    // Hide the opening controls as well.
    scrollButton.hidden = true;
    startButton.hidden = true;

    // Requirement M: Select the ending based on the player's choices.
    if (ending === "curse") {
        paragraph1.textContent = "Ending 3: The Keeper's Curse";
        paragraph2.textContent = "";
        paragraph3.textContent = "";
    } else if (ending === "mystery") {
        paragraph1.textContent = "Ending 2: Mystery Remains";
        paragraph2.textContent = "You escape the dungeon, but its secrets remain hidden.";
        paragraph3.textContent = "";
    } else if (ending === "truth") {
        paragraph1.textContent = "Ending 1: Truth Revealed";
        paragraph2.textContent =
            "You have uncovered the Keeper's true identity.";
        paragraph3.textContent = "";
    }

    // Requirement Q: Play the door sound for successful escapes only.
    if (ending === "truth" || ending === "mystery") {
        doorEscapeSound.currentTime = 0;
        doorEscapeSound.play().catch((error) => {
            console.warn("Door escape sound could not play:", error);
        });
    }

    // Requirement Q: Play the outro for every ending.
    outroMusic.currentTime = 0;
    outroMusic.play().catch((error) => {
        console.warn("Outro music could not play:", error);
    });
}

// Requirements B, D, I, N, Q, and U:
// Discover the iron key, collect it, and add it to inventory.
//
// References:
// MDN createElement:
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// MDN appendChild:
// https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild

// Requirement U: Track whether the player has collected the key.
let hasKey = false;

// Requirement Q: Play the key discovery sound.
const keyDiscoverySound = new Audio("audio/key-discovery.mp3");

// Reveal the key when the player searches the rubble.
function searchRubble() {
    if (!gameStarted || gameEnded) {
        return;
    }

    hideDoorChoices();
    if (hasKey) {
        return;
    }

    paragraph1.textContent = "You discover an iron key beneath the rubble.";
    keyButton.hidden = false;
}

// Requirements D and N: Create a visible inventory item.
function collectKey() {
    if (!gameStarted || gameEnded || keyButton.hidden) {
        return;
    }

    hideDoorChoices();
    if (hasKey) {
        return;
    }

    hasKey = true;

    // Requirement O: The key is one of the four Secrets Revealed.
    recordDiscovery("iron-key");

    const inventoryItem = document.createElement("li");
    inventoryItem.textContent = "Iron key";
    inventoryList.appendChild(inventoryItem);

    keyButton.hidden = true;

    keyDiscoverySound.currentTime = 0;
    keyDiscoverySound.play().catch((error) => {
        console.warn("Key discovery sound could not play:", error);
    });

    paragraph1.textContent = "Iron key added to inventory.";
}

// Requirement I: Respond to player interactions.
rubbleButton.addEventListener("click", searchRubble);
keyButton.addEventListener("click", collectKey);

// Requirements B, D, I, N, Q, and U:
// Collect the Moonstone, display its inscription, and update inventory.
//
// References:
// MDN createElement:
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// MDN appendChild:
// https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
// MDN HTMLMediaElement.play:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play

// Requirement U: Track whether the Moonstone has been collected.
let hasMoonstone = false;

// Requirement Q: Moonstone discovery sound.
const moonstoneDiscoverySound = new Audio("audio/moonstone-discovery.mp3");

// Requirements B, D, and N: Collect the Moonstone once.
function collectMoonstone() {
    if (!gameStarted || gameEnded) {
        return;
    }

    hideDoorChoices();
    if (hasMoonstone) {
        return;
    }

    hasMoonstone = true;

    // Requirement O: The Moonstone is one of the four Secrets Revealed.
    recordDiscovery("moonstone");
    addJournalEntry("Moonstone inscription: AWRNO.");

    const inventoryItem = document.createElement("li");
    inventoryItem.textContent = "Moonstone";
    inventoryList.appendChild(inventoryItem);

    moonstoneButton.hidden = true;

    // Requirement Q: Play the Moonstone's unique discovery sound.
    moonstoneDiscoverySound.currentTime = 0;
    moonstoneDiscoverySound.play().catch((error) => {
        console.warn("Moonstone discovery sound could not play:", error);
    });

    // Requirement J: Reveal the scrambled inscription.
    paragraph1.textContent =
        "You discover the Moonstone. Five letters are inscribed upon it: AWRNO.";
}

// Requirement I: Listen for the Moonstone click.
moonstoneButton.addEventListener("click", collectMoonstone);

// Requirements B, D, and P:
// Create and append a new paragraph whenever the player discovers a clue.
//
// References:
// MDN createElement:
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// MDN appendChild:
// https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
// MDN textContent:
// https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent

function addJournalEntry(message) {
    const entry = document.createElement("p");
    entry.textContent = message;

    journalList.appendChild(entry);
}

// Requirements B, O, and U:
// Record unique discoveries and update the player's progress.
//
// References:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent

function recordDiscovery(discoveryId) {
    if (revealedSecrets.has(discoveryId)) {
        return;
    }

    revealedSecrets.add(discoveryId);
    discoveryCount++;

    // Requirement O: Display secrets revealed out of four.
    scoreDisplay.textContent = `${discoveryCount} of 4`;
}

// Requirement U: Prevent meaningful clues from entering the journal twice.
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
const discoveredClues = new Set();

// Requirements B, I, J, P, Q, and U:
// Show object details, play interaction feedback, and record only new clues.
// References:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
const interactionSound = new Audio("audio/interact.mp3");

function hideDoorChoices() {
    escapeButton.hidden = true;
    speakButton.hidden = true;
    leaveButton.hidden = true;
    exploreButton.hidden = true;
    nameForm.hidden = true;
}

function examineObject(description, clueId = null, journalText = null) {
    if (!gameStarted || gameEnded) {
        return;
    }

    hideDoorChoices();
    paragraph1.textContent = description;
    paragraph2.textContent = "";
    paragraph3.textContent = "";

    // Requirement Q: Give feedback even when the object is not a clue.
    interactionSound.currentTime = 0;
    interactionSound.play().catch((error) => {
        console.warn("Interaction sound could not play:", error);
    });

    if (clueId !== null && !discoveredClues.has(clueId)) {
        addJournalEntry(journalText ?? description);
        discoveredClues.add(clueId);

        // Requirement O: Only meaningful first-time discoveries count.
        recordDiscovery(clueId);
    }
}

// Requirements B, I, J, P, and U:
// Examine the books and record Sir Rowan's clue only once.
//
// Reference:
// MDN Functions:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

function examineBooks() {
    // Temporary text until Maria finalizes the narrative.
    const description =
        "You examine an old book containing the history of Sir Rowan.";

    const clue =
        "Sir Rowan's name may help decipher the Moonstone inscription: AWRNO.";

    examineObject(description, "books", clue);
}

// Requirement I: Respond when the player examines the books.
booksButton.addEventListener("click", examineBooks);

// Requirements B, I, J, P, and U:
// Reuse examineObject() for story interactions.
// Only meaningful clues are recorded in the journal.
//
// Reference:
// MDN addEventListener:
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

// Temporary text; Maria will provide the final narrative.
lettersButton.addEventListener("click", () => {
    examineObject(
        "You discover old letters describing the castle's troubled past.",
        "letters",
        "The letters suggest the castle was sealed to conceal a dangerous secret."
    );
});

shacklesButton.addEventListener("click", () => {
    examineObject(
        "Rusty shackles hang from the dungeon wall."
    );
});

skeletonButton.addEventListener("click", () => {
    examineObject(
        "A skeleton rests against the cold dungeon wall."
    );
});

ratButton.addEventListener("click", () => {
    examineObject(
        "A rat scurries away as you approach."
    );
});

// Requirements B, C, I, J, Q, and U:
// Display three progressive hints, tracking how many have been revealed.
//
// References:
// MDN Arrays:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
// MDN addEventListener:
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

// Our three agreed crystal ball hints.
const crystalBallHints = [
    "What has fallen may conceal the means of freedom.",
    "The stone remembers a name the castle has forgotten.",
    "A key opens iron. A name reveals the truth."
];

// Requirement U: Track how many hints the player has received.
let hintsUsed = 0;

// Requirement Q: Magical crystal ball sound.
const crystalBallSound = new Audio("audio/crystal-ball.mp3");

function consultCrystalBall() {
    if (!gameStarted || gameEnded) {
        return;
    }

    hideDoorChoices();

    // Requirement C: Check whether any hints remain.
    if (hintsUsed >= crystalBallHints.length) {
        paragraph1.textContent = "Nothing more to reveal.";
        paragraph2.textContent = "";
        paragraph3.textContent = "";
        return;
    }

    // Display the next hint.
    paragraph1.textContent = crystalBallHints[hintsUsed];
    paragraph2.textContent = "";
    paragraph3.textContent = "";

    hintsUsed++;
    questionsUsedDisplay.textContent = hintsUsed;

    // Requirement Q: Play the magical sound when a new hint appears.
    crystalBallSound.currentTime = 0;
    crystalBallSound.play().catch((error) => {
        console.warn("Crystal ball sound could not play:", error);
    });
}

// Requirement I: Respond to the crystal ball click.
crystalBallButton.addEventListener("click", consultCrystalBall);

// Requirements B, I, J, M, and U:
// Check inventory before allowing the player to escape.
// The Moonstone makes the ROWAN challenge available.
//
// References:
// MDN Conditional statements:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
// MDN HTMLElement.hidden:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden

function examineDoor() {
    if (!gameStarted || gameEnded) {
        return;
    }

    // Hide any choices left visible from an earlier interaction.
    escapeButton.hidden = true;
    speakButton.hidden = true;
    leaveButton.hidden = true;
    exploreButton.hidden = true;
    nameForm.hidden = true;

    // Requirement M: The player cannot escape without the key.
    if (!hasKey) {
        paragraph1.textContent = "The heavy dungeon door is locked.";
        paragraph2.textContent = "You need to find a key.";
        paragraph3.textContent = "";
        return;
    }

    // The player has the key and can choose to escape.
    paragraph1.textContent = "Your iron key fits the dungeon door.";
    paragraph2.textContent = "You can escape now or continue exploring.";
    paragraph3.textContent = "";

    escapeButton.hidden = false;
    exploreButton.hidden = false;

    // Requirement M: The Moonstone unlocks the optional name challenge.
    if (hasMoonstone) {
        paragraph3.textContent =
            "The Moonstone may hold the secret of the Keeper.";

        speakButton.hidden = false;
    }
}

// Requirement I: Respond when the player examines the door.
doorButton.addEventListener("click", examineDoor);

// Requirements B, I, and M:
// Handle the player's choices at the dungeon door.
//
// References:
// MDN addEventListener:
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
// MDN conditional statements:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else

// Escape without solving the mystery.
function escapeDungeon() {
    if (!gameStarted || gameEnded || !hasKey) {
        return;
    }

    endGame("mystery");
}

// Continue searching the dungeon.
function continueExploring() {
    if (!gameStarted || gameEnded) {
        return;
    }

    escapeButton.hidden = true;
    speakButton.hidden = true;
    leaveButton.hidden = true;
    exploreButton.hidden = true;
    nameForm.hidden = true;

    paragraph1.textContent = "You continue exploring the dungeon.";
    paragraph2.textContent = "";
    paragraph3.textContent = "";
}

// Reveal the ROWAN input form when the player has the Moonstone.
function attemptNameChallenge() {
    if (!gameStarted || gameEnded || !hasKey || !hasMoonstone) {
        return;
    }

    escapeButton.hidden = true;
    speakButton.hidden = true;
    nameForm.hidden = false;
    leaveButton.hidden = false;
    exploreButton.hidden = false;

    paragraph1.textContent = "Speak the forgotten name.";
    paragraph2.textContent = "The Moonstone bears the letters AWRNO.";
    paragraph3.textContent = "";

    nameInput.value = "";
    nameInput.focus();
}

// Requirement I: Connect the door choice buttons.
escapeButton.addEventListener("click", escapeDungeon);
leaveButton.addEventListener("click", escapeDungeon);
exploreButton.addEventListener("click", continueExploring);
speakButton.addEventListener("click", attemptNameChallenge);

// Requirements B, I, M, X, and Y:
// Validate the player's typed answer using a regular expression.
// A correct answer with both required items reveals the truth.
//
// References:
// MDN Regular expressions:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
// MDN HTMLFormElement submit event:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
// MDN Event.preventDefault:
// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

function submitName(event) {
    // Prevent the form from reloading the webpage.
    event.preventDefault();

    // Require both items for the Truth Revealed ending.
    if (!gameStarted || gameEnded || !hasKey || !hasMoonstone || nameForm.hidden) {
        return;
    }

    // Requirement Y: Validate ROWAN using a regular expression.
    const correctName = /^ROWAN$/i;
    const playerAnswer = nameInput.value.trim();

    if (correctName.test(playerAnswer)) {
        // Requirement M: Correct answer unlocks the best ending.
        endGame("truth");
    } else {
        // Allow another attempt while the timer keeps running.
        paragraph1.textContent = "The name echoes through the dungeon.";
        paragraph2.textContent = "Nothing happens. Perhaps that is not the name.";
        paragraph3.textContent = "";

        nameInput.value = "";
        nameInput.focus();
    }
}

// Requirement I: Listen for the name form submission.
nameForm.addEventListener("submit", submitName);

// Requirements B and U: Reset one playthrough without reloading the page.
// References:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear
// https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren
function restartGame() {
    clearInterval(timerInterval);
    timerInterval = null;

    // Pause and rewind all audio so nothing carries into a new game.
    const allAudio = [wallSound, introMusic, gameplayMusic, outroMusic,
        doorEscapeSound, wolfWarning, keyDiscoverySound,
        moonstoneDiscoverySound, interactionSound, crystalBallSound];

    for (const audio of allAudio) {
        audio.pause();
        audio.currentTime = 0;
    }

    gameStarted = false;
    gameEnded = false;
    scrollOpened = false;
    hasKey = false;
    hasMoonstone = false;
    timeRemaining = 300;
    wolfHasPlayed = false;
    hintsUsed = 0;
    discoveryCount = 0;
    discoveredClues.clear();
    revealedSecrets.clear();

    // Clear only the inventory entries JavaScript created.
    for (const item of Array.from(inventoryList.children)) {
        if (item.id !== "has-key" && item.id !== "has-moonstone") {
            item.remove();
        }
    }

    document.getElementById("has-key").hidden = true;
    document.getElementById("has-moonstone").hidden = true;
    journalList.replaceChildren();
    scoreDisplay.textContent = "0 of 4";
    questionsUsedDisplay.textContent = "0";
    timeDisplay.textContent = "5:00";
    timeDisplay.style.color = "";

    changeSceneImage("images/dungeon-dark.jpg");
    dungeonItems.hidden = true;
    keyButton.hidden = true;
    moonstoneButton.hidden = false;
    stats.hidden = true;
    scrollButton.hidden = false;
    startButton.hidden = true;
    restartButton.hidden = true;
    hideDoorChoices();

    paragraph1.textContent = "";
    paragraph2.textContent = "";
    paragraph3.textContent = "";
}

// Requirement I: Make the ending's Play Again button functional.
restartButton.addEventListener("click", restartGame);

// Ensure the initial screen and state are consistent without playing audio.
restartGame();
