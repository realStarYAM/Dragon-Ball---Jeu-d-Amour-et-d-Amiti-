document.addEventListener("DOMContentLoaded", function () {
    fetch("pays.json")
        .then(response => response.json())
        .then(data => {
            let countrySelect = document.getElementById("country");
            data.forEach(pays => {
                let option = document.createElement("option");
                option.value = pays.code;
                option.textContent = `${pays.emoji} ${pays.nom}`;
                countrySelect.appendChild(option);
            });
        });
});

function startGame() {
    let character = document.getElementById("character").value;
    let country = document.getElementById("country").value;

    let characterName = character.charAt(0).toUpperCase() + character.slice(1);
    let resultText = `Tu pars en voyage avec ${characterName} dans ${country} !`;
    document.getElementById("result").textContent = resultText;

    let imgSrc = `images/${character}.png`; // Exemple : images/vegeta.png
    let charImg = document.getElementById("character-img");
    charImg.src = imgSrc;
    charImg.style.display = "block";
}
