document.addEventListener("DOMContentLoaded", () => {
    // Chiavi per localStorage
    const STORAGE_KEY_VALUE = "counter-value-v1";
    const STORAGE_KEY_THEME = "counter-theme-v1";

    // Valore iniziale del counter
    let counterValue = 0;

    // 1. Recupero il contenitore principale
    const appRoot = document.getElementById("app");

    // 2. Creo gli elementi dell'interfaccia

    // Contenitore principale del counter
    const counterContainer = document.createElement("div");
    counterContainer.className = "counter-container";

    // Titolo
    const title = document.createElement("h1");
    title.className = "counter-title";
    title.textContent = "Counter";

    // Display del valore
    const display = document.createElement("div");
    display.className = "counter-display";
    display.textContent = counterValue; // verrà sovrascritto dopo dal valore salvato

    // Testo di aiuto
    const hint = document.createElement("div");
    hint.className = "counter-hint";
    hint.textContent = "Doppio click sul numero per resettare a 0";

    // Contenitore dei pulsanti (+ e -)
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.className = "counter-buttons";

    // Pulsante -
    const btnMinus = document.createElement("button");
    btnMinus.className = "counter-btn";
    btnMinus.textContent = "−";

    // Pulsante +
    const btnPlus = document.createElement("button");
    btnPlus.className = "counter-btn";
    btnPlus.textContent = "+";

    // Pulsante per cambio tema
    const themeToggle = document.createElement("button");
    themeToggle.className = "theme-toggle";
    themeToggle.type = "button";

    // Assemblo il layout
    buttonsWrapper.appendChild(btnMinus);
    buttonsWrapper.appendChild(btnPlus);

    counterContainer.appendChild(title);
    counterContainer.appendChild(display);
    counterContainer.appendChild(hint);
    counterContainer.appendChild(buttonsWrapper);
    counterContainer.appendChild(themeToggle);

    appRoot.appendChild(counterContainer);

    // 3. Gestione tema (chiaro/scuro)

    let isLightTheme = false;

    // Carica tema salvato, se presente
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    if (savedTheme === "light") {
        isLightTheme = true;
        document.body.classList.add("light-theme");
    }

    function updateThemeToggleLabel() {
        themeToggle.textContent = isLightTheme
            ? "Passa al tema scuro"
            : "Passa al tema chiaro";
    }

    themeToggle.addEventListener("click", () => {
        isLightTheme = !isLightTheme;
        document.body.classList.toggle("light-theme", isLightTheme);
        localStorage.setItem(STORAGE_KEY_THEME, isLightTheme ? "light" : "dark");
        updateThemeToggleLabel();
    });

    // 4. Gestione del counter con localStorage

    // Provo a caricare il valore del counter da localStorage
    const savedValue = localStorage.getItem(STORAGE_KEY_VALUE);
    if (savedValue !== null && !Number.isNaN(Number(savedValue))) {
        counterValue = Number(savedValue);
    }

    function updateDisplay() {
        display.textContent = counterValue;
        // Salvo sempre il nuovo valore
        localStorage.setItem(STORAGE_KEY_VALUE, String(counterValue));
    }

    // Click sul pulsante +
    btnPlus.addEventListener("click", () => {
        counterValue++;
        updateDisplay();
    });

    // Click sul pulsante -
    btnMinus.addEventListener("click", () => {
        counterValue--;
        updateDisplay();
    });

    // Doppio click sul display per resettare a 0
    display.addEventListener("dblclick", () => {
        counterValue = 0;
        updateDisplay();
    });

    // Inizializzo UI in base ai valori salvati
    updateDisplay();
    updateThemeToggleLabel();
});
