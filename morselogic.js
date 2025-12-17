const morseMap = {
    A: ".-", B: "-...", C: "-.-.", D: "-..",
    E: ".", F: "..-.", G: "--.", H: "....",
    I: "..", J: ".---", K: "-.-", L: ".-..",
    M: "--", N: "-.", O: "---", P: ".--.",
    Q: "--.-", R: ".-.", S: "...", T: "-",
    U: "..-", V: "...-", W: ".--", X: "-..-",
    Y: "-.--", Z: "--..",
    "0": "-----", "1": ".----", "2": "..---",
    "3": "...--", "4": "....-", "5": ".....",
    "6": "-....", "7": "--...", "8": "---..",
    "9": "----.",
    " ": "/"
};

let morseSequence = [];

/* Convert text to Morse and display */
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

/* Play Morse with vibration + highlighting */
async function playMorse() {
    if (!("vibrate" in navigator)) {
        alert("Vibration not supported on this device");
        return;
    }

    const letters = document.querySelectorAll(".letter");
    const morseSpans = document.querySelectorAll(".morse");

    // ⏱ Optimized, slow & clear timings
    const DOT = 350;
    const DASH = 1000;
    const SYMBOL_GAP = 350;
    const LETTER_GAP = 1200;
    const WORD_GAP = 2000;

    for (let i = 0; i < morseSequence.length; i++) {

        letters[i].classList.add("active");
        morseSpans[i].classList.add("active");

        const morse = morseSequence[i].morse;

        if (morse === "/") {
            await sleep(WORD_GAP);
        } else {
            for (let symbol of morse) {

                if (symbol === ".") {
                    morseSpans[i].classList.add("dot-active");
                    navigator.vibrate(DOT);
                    await sleep(DOT);
                    morseSpans[i].classList.remove("dot-active");
                }

                if (symbol === "-") {
                    await sleep(200); // pre-pause for dash emphasis
                    morseSpans[i].classList.add("dash-active");
                    navigator.vibrate(DASH);
                    await sleep(DASH);
                    morseSpans[i].classList.remove("dash-active");
                }

                await sleep(SYMBOL_GAP);
            }
            await sleep(LETTER_GAP);
        }

        letters[i].classList.remove("active");
        morseSpans[i].classList.remove("active");
    }
}

/* Utility delay */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
