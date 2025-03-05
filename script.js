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
    
    let resultText = `Tu pars en voyage avec ${character} dans ${country} !`;
    document.getElementById("result").textContent = resultText;
}
