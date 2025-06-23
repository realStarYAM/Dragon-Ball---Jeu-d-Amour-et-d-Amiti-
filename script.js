document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    fr: {
      title: "Dragon Ball - Jeu d'Amour et d'Amitié",
      labelCharacter: "Choisis ton personnage :",
      labelLanguage: "Choisis la langue d'affichage :",
      labelCountry: "Choisis un pays pour partir en voyage :",
      buttonStart: "Commencer l'aventure",
      tableName: "Nom",
      tableKI: "KI",
      result: (c, p) => `Tu pars en voyage avec ${c} en ${p} !`
    },
    en: {
      title: "Dragon Ball - Game of Love & Friendship",
      labelCharacter: "Choose your character:",
      labelLanguage: "Choose display language:",
      labelCountry: "Choose a country to travel:",
      buttonStart: "Start the adventure",
      tableName: "Name",
      tableKI: "KI",
      result: (c, p) => `You are going on a trip with ${c} to ${p}!`
    },
    ar: {
      title: "\u062F\u0631\u0627\u063A\u0648\u0646 \u0628\u0648\u0644 - \u0644\u0639\u0628\u0629 \u0627\u0644\u062D\u0628 \u0648\u0627\u0644\u0635\u062F\u0627\u0642\u0629",
      labelCharacter: "\u0627\u062E\u062A\u0631 \u0634\u062E\u0635\u064A\u062A\u0643:",
      labelLanguage: "\u0627\u062E\u062A\u0631 \u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0636:",
      labelCountry: "\u0627\u062E\u062A\u0631 \u0628\u0644\u062F\u0627 \u0644\u0644\u0633\u0641\u0631:",
      buttonStart: "\u0627\u0628\u062F\u0623 \u0627\u0644\u0645\u063A\u0627\u0645\u0631\u0629",
      tableName: "\u0627\u0644\u0627\u0633\u0645",
      tableKI: "\u0643\u064A",
      result: (c, p) => `\u0623\u0646\u062A \u0630\u0627\u0647\u0628 \u0641\u064A \u0631\u062D\u0644\u0629 \u0645\u0639 ${c} \u0625\u0644\u0649 ${p}!`
    },
    es: {
      title: "Dragon Ball - Juego de Amor y Amistad",
      labelCharacter: "Elige tu personaje:",
      labelLanguage: "Elige el idioma de visualización:",
      labelCountry: "Elige un país para viajar:",
      buttonStart: "Comenzar la aventura",
      tableName: "Nombre",
      tableKI: "KI",
      result: (c, p) => `\u00a1Te vas de viaje con ${c} a ${p}!`
    },
    it: {
      title: "Dragon Ball - Gioco d'Amore e d'Amicizia",
      labelCharacter: "Scegli il tuo personaggio:",
      labelLanguage: "Scegli la lingua di visualizzazione:",
      labelCountry: "Scegli un paese in cui viaggiare:",
      buttonStart: "Inizia l'avventura",
      tableName: "Nome",
      tableKI: "KI",
      result: (c, p) => `Parti per un viaggio con ${c} in ${p}!`
    }
  };

  const characters = [
    { name: 'Goku', ki: 9000 },
    { name: 'Vegeta', ki: 8500 },
    { name: 'Gohan', ki: 7000 },
    { name: 'Bulma', ki: 200 }
  ];

  const p = document.querySelectorAll('.aero-container p');
  const els = {
    title: document.querySelector('h1'),
    characterLabel: p[0],
    languageLabel: p[1],
    countryLabel: p[2],
    button: document.querySelector('.aero-container button'),
    languageSelect: document.getElementById('language'),
    countrySelect: document.getElementById('country'),
    result: document.getElementById('result'),
    kiHeadName: document.querySelector('.ki-table th:nth-child(1)'),
    kiHeadKI: document.querySelector('.ki-table th:nth-child(2)'),
    kiBody: document.querySelector('.ki-table tbody'),
    html: document.documentElement,
    body: document.body,
    pageTitle: document.querySelector('title')
  };

  let countriesData = [];

  fetch('countries.json')
    .then(r => r.json())
    .then(data => {
      countriesData = data;
      updateInterface(els.languageSelect.value);
    });

  els.languageSelect.addEventListener('change', () => {
    updateInterface(els.languageSelect.value);
  });

  function populateCountries(lang) {
    els.countrySelect.innerHTML = '';
    countriesData.forEach(c => {
      const o = document.createElement('option');
      o.value = c.code;
      o.textContent = `${c.emoji} ${c[lang]}`;
      els.countrySelect.appendChild(o);
    });
  }

  function populateTable() {
    els.kiBody.innerHTML = characters
      .map(c => `<tr><td>${c.name}</td><td>${c.ki}</td></tr>`)
      .join('');
  }

  function updateInterface(lang) {
    const t = translations[lang];
    els.title.textContent = t.title;
    els.pageTitle.textContent = t.title;
    els.characterLabel.textContent = t.labelCharacter;
    els.languageLabel.textContent = t.labelLanguage;
    els.countryLabel.textContent = t.labelCountry;
    els.button.textContent = t.buttonStart;
    els.kiHeadName.textContent = t.tableName;
    els.kiHeadKI.textContent = t.tableKI;
    els.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    els.html.lang = lang;
    populateCountries(lang);
    populateTable();

    const char = document.getElementById('character').value;
    const charName = char.charAt(0).toUpperCase() + char.slice(1);
    const countryName = els.countrySelect.options[els.countrySelect.selectedIndex]?.textContent || '';
    if (els.result.textContent)
      els.result.textContent = t.result(charName, countryName);
  }

  window.startGame = function () {
    const char = document.getElementById('character').value;
    const charName = char.charAt(0).toUpperCase() + char.slice(1);
    const countryName = els.countrySelect.options[els.countrySelect.selectedIndex].textContent;
    els.result.textContent = translations[els.languageSelect.value].result(charName, countryName);
    const img = document.getElementById('character-img');
    img.src = `${char}.png`;
    img.alt = charName;
    img.style.display = 'block';
  };
});
