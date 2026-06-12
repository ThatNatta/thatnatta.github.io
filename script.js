//these are my attempts at creating classes and lists?
const Gender = ["Mare", "Stallion", "Gelding"]; //this is also a class but with more than one option
const FemaleName = ["Luna", "Ethel"];
const MaleName = ["Harry", "Pow"];
const Age = ["Foal", "Yearling", "Adult", "Senior"];
const Breed = ["Breton", "Shetland", "Arabian"];
const Extension = ["EE", "Ee", "ee"];
const Agouti = ["AA", "Aa", "aa"];
const breedImages = {
  Arabian: "images/breeds/arabian.png",
  Breton: "images/breeds/breton.png",
  Shetland: "images/breeds/shetland.png",
};
const coatImages = {
  Bay: "images/breeds/arabian/bay.png",
  Black: "images/breeds/shetland/black.png",
  Chestnut: "images/breeds/breton/chestnut.png"
};
//end

let currentHorseIndex = null;
let coins = 0;
let ownedHorses = [];
let day = 1;

//this enables it to pull from a list randomly

//this is the script to earn money
function earn() {
  coins += 10;
  document.getElementById("coins").textContent = coins;
  saveGame();
}

//this is the script to buy a horse
function getHorse() {
  if (coins < 100) {
    alert("Not enough coins!");
    return;
  }

  coins -= 100;

  const newHorse = createHorse();
  ownedHorses.push(newHorse);

  document.getElementById("horses").textContent = ownedHorses.length;
  document.getElementById("coins").textContent = coins;

  console.log("New horse adopted:", newHorse);

  saveGame();
}

//this is the script to display current horses in a list
function seeHorses() {
  if (ownedHorses < 1) {
    alert("You don't own any horses!");
    return;
  }

  const horseList = document.getElementById("horseList");

  // Clear old contents
  horseList.innerHTML = "";

  // Add each horse
  ownedHorses.forEach((horse, index) => {
    horseList.innerHTML += `
  <p>
    <button onclick="visitHorse(${index})">
      Visit
    </button>

    ${horse.name}
    (${horse.gender}, ${horse.age}, ${horse.breed})
  </p>
`;
  });
}

function randomChoice(list) {
  return list[Math.floor(Math.random() * list.length)];
}
//end

//this is where it creates the actual horse
function createHorse() {
  const gender = randomChoice(Gender);

  let name;

  if (gender == "Mare") {
    name = randomChoice(FemaleName);
  } else {
    name = randomChoice(MaleName);
  }

  const Health = Math.floor(Math.random() * 31);

  const Strength = Math.floor(Math.random() * 31);

  const coatColor = getCoatColor(
  extension,
  agouti
);

  return {
    id: Date.now(),
    name: name,
    gender: gender,
    age: randomChoice(Age),
    breed: randomChoice(Breed),
    extension: randomChoice(Extension),
    agouti: randomChoice(Agouti),
    health: Health,
    strength: Strength,
    coatColor: coatColor,

    fedToday: false,
    wateredToday: false,
    brushedToday: false,
  };
}
// {}

function visitHorse(index) {
  currentHorseIndex = index;

  const horse = ownedHorses[index];

  const breedImage = breedImages[horse.breed];
  const coatImage = coatImages[horse.coatColor]

  document.getElementById("horseActions").style.display = "block";

  document.getElementById("horseList").style.display = "none";

  document.getElementById("horseProfile").style.display = "block";

  document.getElementById("horseProfile").innerHTML = `<h2>${horse.name}</h2>
<div class="horseContainer">
  <img class="layer" src="${breedImage}">
  <img class="layer" src="${coatImage}">
</div>
  <p>Gender: ${horse.gender}</p>
  <p>Age: ${horse.age}</p>
  <p>Breed: ${horse.breed}</p>
<p>
  Overall Health:
  ${getHealthRating(horse.health)}
</p>

<p>
  Strenght: ${getStrengthRating(horse.strength)}
  </p>

<p> Genetics: ${getCoatColor(horse.coatColor)} </p>

  <button onclick="backToList()">
  Back 
  </button>
  `;
}

function backToList() {
  document.getElementById("horseList").style.display = "block";

  document.getElementById("horseProfile").style.display = "none";

  document.getElementById("horseActions").style.display = "none";
}

//this is what generates the base health score
function getHealthRating(health) {
  if (health <= 10) {
    return "Poor";
  }
  if (health <= 20) {
    return "Adequate";
  }
  return "Excellent";
}

function getStrengthRating(strength) {
  if (strength <= 10) {
    return "Poor";
  }
  if (strength <= 20) {
    return "Adequate";
  }
  return "Excellent";
}

function getCoatColor(extension, agouti) {
  if (extension === "ee") {
    return "Chestnut";
  }

  if ((extension === "EE" || extension === "Ee") && agouti === "aa") {
    return "Black";
  }

  return "Bay";
}

function brush() {
  if (currentHorseIndex === null) {
    alert("Visit a horse first!");
    return;
  }

  const horse = ownedHorses[currentHorseIndex];

  if (horse.brushedToday === true) {
    alert("Horse has already been brushed today!");
    return;
  }

  if (horse.health < 30) {
    horse.health += 1;

    horse.brushedToday = true;

    saveGame();
  }

  visitHorse(currentHorseIndex);

  console.log(horse.name + " was brushed. Health is now " + horse.health);
}

function feed() {
  if (currentHorseIndex === null) {
    alert("Visit a horse first!");
    return;
  }

  const horse = ownedHorses[currentHorseIndex];

  if (horse.fedToday === true) {
    alert("Horse has already been fed today!");
    return;
  }

  if (horse.health < 30) {
    horse.health += 1;

    horse.fedToday = true;

    saveGame();
  }

  visitHorse(currentHorseIndex);

  console.log(horse.name + " was fed. Health is now " + horse.health);
}

function water() {
  if (currentHorseIndex === null) {
    alert("Visit a horse first!");
    return;
  }

  const horse = ownedHorses[currentHorseIndex];

  if (horse.wateredToday === true) {
    alert("Horse has already been given water today!");
    return;
  }

  if (horse.health < 30) {
    horse.health += 1;

    horse.wateredToday = true;
  }

  visitHorse(currentHorseIndex);

  console.log(horse.name + " was given water. Health is now " + horse.health);

  saveGame();
}

function train() {
  if (currentHorseIndex === null) {
    alert("Visit a horse first!");
    return;
  }

  const horse = ownedHorses[currentHorseIndex];

  if (horse.strength < 30) {
    horse.strength += 1;

    horse.trainedToday = true;

    saveGame();
  }

  visitHorse(currentHorseIndex);

  console.log(horse.name + " was trained. Strength is now " + horse.strength);
}

function rollover() {
  day++;

  document.getElementById("day").textContent = day;

  ownedHorses.forEach((horse) => {
    if (!horse.fedToday) {
      horse.health -= 2;
    }

    if (!horse.wateredToday) {
      horse.health -= 2;
    }

    if (!horse.brushedToday) {
      horse.health -= 1;
    }

    horse.fedToday = false;
    horse.wateredToday = false;
    horse.brushedToday = false;
  });

  saveGame();

  console.log("New day started");
}

function restartGame() {
  const confirmed = confirm(
    "Are you sure you want to delete your ranch and start over?",
  );

  if (!confirmed) {
    return;
  }

  localStorage.removeItem("myRanchSave");

  coins = 0;
  ownedHorses = [];
  day = 1;
  currentHorseIndex = null;

  document.getElementById("coins").textContent = coins;
  document.getElementById("horses").textContent = ownedHorses.length;
  document.getElementById("day").textContent = day;

  document.getElementById("horseList").innerHTML = "";
  document.getElementById("horseProfile").innerHTML = "";

  document.getElementById("horseProfile").style.display = "none";
  document.getElementById("horseActions").style.display = "none";

  console.log("Game restarted.");

  saveGame();
}

//this part saves the game locally
function saveGame() {
  const gameData = {
    coins: coins,
    day: day,
    ownedHorses: ownedHorses,
  };

  localStorage.setItem("myRanchSave", JSON.stringify(gameData));
}
//end

//this part loads the game after a reload
function loadGame() {
  const saveData = localStorage.getItem("myRanchSave");

  if (!saveData) {
    return;
  }

  const gameData = JSON.parse(saveData);

  coins = gameData.coins;
  ownedHorses = gameData.ownedHorses;
  day = gameData.day;

  document.getElementById("coins").textContent = coins;
  document.getElementById("horses").textContent = ownedHorses.length;
  document.getElementById("day").textContent = day;

  console.log("Game loaded!");
}
//end
//these are just so the console shows what pops up and not
console.log(ownedHorses);
//end