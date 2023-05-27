
//Fetch Data from JSON
async function fetchData() {
  const response = await fetch('http://localhost:3000/quests');
  const data = await response.json();
  console.log(data);
}

fetchData();


// DOM Elements
const sunElement = document.getElementById('sun');
const devModeButton = document.getElementById('devModeButton');

// Geographic constants
const latitude = 50.3084;  // Hof an der Saale
const longitude = 11.9163;

// Dev Mode variables
let devMode = false;  // Set initial dev mode status
let virtualNow = new Date();
const virtualNowSpeed = 120;

// Update button text when dev mode is toggled
devModeButton.addEventListener('click', () => {
  devMode = !devMode;
  devModeButton.textContent = devMode ? "Schalte Dev Mode aus" : "Schalte Dev Mode ein";
  virtualNow = new Date();
});

function updateSunPosition() {
  const now = devMode ? new Date(virtualNow.getTime() + virtualNowSpeed * 60 * 1000) : new Date();
  virtualNow = now;
  const sunPosition = SunCalc.getPosition(now, latitude, longitude);
  const sunHeight = (sunPosition.altitude + Math.PI / 2) / Math.PI;
  const sunSize = 200 + (600 - 200) * Math.pow(1 - sunHeight, 2);

  sunElement.style.bottom = `calc(${sunHeight * 100}% - ${sunSize}px)`;
  sunElement.style.width = `${sunSize}px`;
  sunElement.style.height = `${sunSize}px`;
  document.body.style.background = sunHeight > 0 ? "linear-gradient(to bottom, #89CFF0 0%, #89CFF0 50%, #3CB371 50%, #3CB371 100%)" : "linear-gradient(to bottom, #000033 0%, #000033 50%, #3CB371 50%, #3CB371 100%)";
}


// Update the sun position every second
setInterval(updateSunPosition, 500);

// Initial sun position update
updateSunPosition();


// Highsccore Board
function createQuestElements(quests) {
  const container = document.getElementById('questsContainer'); // Ändern Sie dies entsprechend Ihrer HTML-Struktur

  quests.forEach(quest => {
    const questElement = document.createElement('div');

    // Hier können Sie den Inhalt und das Aussehen des Elements anpassen, z.B.:
    questElement.innerText = `${quest.name}: ${quest.points} Punkte, ${quest.type}`;

    container.appendChild(questElement);
  });
}

function createHighscoreElements(users) {
  const container = document.getElementById('highscoreContainer'); // Ändern Sie dies entsprechend Ihrer HTML-Struktur

  users.sort((a, b) => b.score - a.score); // sortiert die Nutzer nach Punkten in absteigender Reihenfolge

  users.forEach((user, index) => {
    const userElement = document.createElement('div');

    // Hier können Sie den Inhalt und das Aussehen des Elements anpassen, z.B.:
    userElement.innerText = `${user.name}: ${user.score} Punkte`;
    if (index < 5) { // Wenn der Nutzer unter den Top 5 ist
      userElement.style.color = user.color; // Die Farbe des Nutzers setzen
      userElement.style.fontSize = '20px'; // Die Größe des Textes setzen
    } else {
      userElement.style.color = 'white'; // Eine einheitliche Farbe setzen
      userElement.style.fontSize = '16px'; // Eine kleinere Schriftgröße setzen
    }

    container.appendChild(userElement);
  });
}

async function fetchData() {
  const questsResponse = await fetch('http://localhost:3000/quests');
  const questsData = await questsResponse.json();
  createQuestElements(questsData);

  const usersResponse = await fetch('http://localhost:3000/users');
  const usersData = await usersResponse.json();
  createHighscoreElements(usersData);
}
