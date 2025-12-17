const morseMap = {
    A: ".-", B: "-...", C: "-.-.", D: "-..",
    E: ".", F: "..-.", G: "--.", H: "....",
    I: "..", J: ".---", K: "-.-", L: ".-..",
    M: "--", N: "-.", O: "---", P: ".--.",
    Q: "--.-", R: ".-.", S: "...", T: "-",
    U: "..-", V: "...-", W: ".--", X: "-..-",
    Y: "-.--", Z: "--..",
    " ": "/"
};

let morseSequence = [];

function convertToMorse() {
    const text = document.getElementById("textInput").value.toUpperCase();
    const textDisplay = document.getElementById("textDisplay");
    const morseDisplay = document.getElementById("morseDisplay");

    textDisplay.innerHTML = "";
    morseDisplay.innerHTML = "";
    morseSequence = [];

    for (let char of text) {
        const morse = morseMap[char] || "";
        morseSequence.push({ char, morse });

        textDisplay.innerHTML += `<span class="letter">${char}</span>`;
        morseDisplay.innerHTML += `<span class="morse">${morse}</span>`;
    }
}

async function playMorse() {
    if (!("vibrate" in navigator)) {
        alert("Vibration not supported");
        return;
    }

    const letters = document.querySelectorAll(".letter");
    const morseSpans = document.querySelectorAll(".morse");

    const DOT = 250;
    const DASH = 1500;
    const SYMBOL_GAP = 900;
    const LETTER_GAP = 1500;
    const WORD_GAP = 2500;

    for (let i = 0; i < morseSequence.length; i++) {
        letters[i].classList.add("active");
        morseSpans[i].classList.add("active");

        const morse = morseSequence[i].morse;

        if (morse === "/") {
            await sleep(WORD_GAP);
        } else {
            for (let symbol of morse) {
                morseSpans[i].classList.add("symbol-active");

                if (symbol === ".") navigator.vibrate(DOT);
                else if (symbol === "-") navigator.vibrate(DASH);

                await sleep(SYMBOL_GAP);
                morseSpans[i].classList.remove("symbol-active");
            }
            await sleep(LETTER_GAP);
        }

        letters[i].classList.remove("active");
        morseSpans[i].classList.remove("active");
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
