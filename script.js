document.getElementById('menuButton').addEventListener('click', function() {
    document.getElementById('menu').classList.toggle('hidden');
});

function showSection(sectionId) {
    var sections = document.querySelectorAll('.content-section');
    sections.forEach(function(section) {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Lisätään tapahtumakäsittelijä jokaiselle valikon linkille
var menuItems = document.querySelectorAll('#menu ul li a');
menuItems.forEach(function(item) {
    item.addEventListener('click', function() {
        document.getElementById('menu').classList.add('hidden');
        var sectionId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        showSection(sectionId);
    });
});

// Rakkaustesti logiikka
document.getElementById('loveTestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var name1 = document.getElementById('name1').value.toLowerCase().trim();
    var name2 = document.getElementById('name2').value.toLowerCase().trim();
    var resultContainer = document.getElementById('resultContainer');
    var result = document.getElementById('result');
    var percentageText = document.querySelector('.percentage-text');
    var customMessage = document.getElementById('customMessage');

    var finalResult;
    if (
        (name1 === 'aleksi' && name2 === 'peppi') || 
        (name1 === 'peppi' && name2 === 'aleksi') ||
        (name1 === 'aleksi seppä' && name2 === 'peppi lomakka') || 
        (name1 === 'aleksi' && name2 === 'peppi lomakka') ||
        (name1 === 'aleksi seppä' && name2 === 'peppi') ||
        (name1 === 'peppi lomakka' && name2 === 'aleksi seppä')
    ) {
        finalResult = 100;
    } else {
        finalResult = Math.floor(Math.random() * 51);
    }

    let currentPercentage = 0;
    percentageText.innerText = '0%';
    const interval = setInterval(() => {
        if (currentPercentage >= finalResult) {
            clearInterval(interval);
            customMessage.style.display = 'block';
            customMessage.value = finalResult === 100 ? 'Olette yhdessä ikuisesti, edes kuolema ei voi teitä erottaa koskaan!' : 'Tässä maailmassa on vain yksi pari, joka voi saada 100%! Ja se ei ole tämä pari todellakaan hyi.';
        } else {
            currentPercentage++;
            percentageText.innerText = currentPercentage + '%';
        }
    }, 20); // Muutetaan lukua 20 saadaksesi halutun nopeuden

    resultContainer.classList.remove('hidden');
    result.classList.remove('hidden');
});

document.getElementById('pongGame').addEventListener('click', () => {
    const script = document.createElement('script');
    script.src = 'pong.js';
    document.body.appendChild(script);
});

document.addEventListener('dblclick', function(event) {
    event.preventDefault();
});


