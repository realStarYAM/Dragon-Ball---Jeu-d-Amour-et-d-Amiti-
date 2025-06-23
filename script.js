document.addEventListener("DOMContentLoaded", function () {
    let countriesData = [];

    fetch("countries.json")
        .then(response => response.json())
        .then(data => {
            countriesData = data;
            populateCountries("fr");
        });

    const langSelect = document.getElementById("language");
    langSelect.addEventListener("change", () => {
        populateCountries(langSelect.value);
    });

    function populateCountries(lang) {
        const countrySelect = document.getElementById("country");
        countrySelect.innerHTML = "";
        countriesData.forEach(pays => {
            const option = document.createElement("option");
            option.value = pays.code;
            option.textContent = `${pays.emoji} ${pays[lang]}`;
            countrySelect.appendChild(option);
        });
    }
});

function startGame() {
    let character = document.getElementById("character").value;
    const countrySelect = document.getElementById("country");
    const countryName = countrySelect.options[countrySelect.selectedIndex].textContent;

    let characterName = character.charAt(0).toUpperCase() + character.slice(1);
    let resultText = `Tu pars en voyage avec ${characterName} en ${countryName} !`;
    document.getElementById("result").textContent = resultText;

    const imgSrc = `${character}.png`;
    const charImg = document.getElementById("character-img");
    charImg.src = imgSrc;
    charImg.alt = characterName;
    charImg.style.display = "block";
}

