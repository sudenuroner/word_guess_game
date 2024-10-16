// HTML den gerekli elementleri seçiyoruz
const inputs = document.querySelector(".word"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess span"),
  mistakes = document.querySelector(".wrong span"),
  resetBtn = document.querySelector(".reset"),
  hintBtn = document.querySelector(".showhint"),
  hintElement = document.querySelector(".hint"),
  typeInput = document.querySelector(".type-input");

  // oyunda kullanacağımız değişkenler
  let word, 
    incorrectLetters = [], 
    correctLetters = [], 
    maxGuessess; 

    // yeni bir oyun başlatmak için kullanılacak fonksiyon
    function startNewGame() {
        alert("yeni oyun başladı!");

        // ipucu elementini gizliyor
        hintElement.style.display = "none";
        hintElement.style.opacity = "0";

        // veritabanından rastgele bir kelime seçiyoruz ve oyunu hazırlıyoruz 
        const ranWord = wordList[Math.floor(Math.random() * wordList.length)];
        word = ranWord.word;

        maxGuessess = word.length >= 5 ? 8 : 6;
        incorrectLetters = [];
        correctLetters = [];
        hintTag.innerText = ranWord.hint;
        guessLeft.innerText = maxGuessess;
        mistakes.innerText = incorrectLetters;

        // her harf için bir input oluştur
        inputs.innerHTML = "";
        for (let i = 0; i < word.length; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.disabled = true;
            inputs.appendChild(input);
        }
    }

// kullanıcı girişini işleyip, oyun istatistiklerini güncelleyen fonksiyon
function handleInput(e){
    const key = e.target.value.toLowerCase();
  if(key.match(/^[a-z]+$/i) && 
    !incorrectLetters.includes(`${key}`) && 
    !correctLetters.includes(`${key}`)
  ) {
    // harfin kelimenin içinde olup olmadığını kontrol ediyoruz
    if(word.includes(key)){
        // doğru tahmini güncelliyoruz
        for(let i=0; i<word.length; i++){
            if(word[i] === key){
                inputs.querySelectorAll("input")[i].value += key;
            }
        }
        correctLetters += key;
    }else{
        // yanlış tahmini güncelliyoruz
        maxGuessess--;
        incorrectLetters.push(`${key}`);
        mistakes.innerText = incorrectLetters;
      }
    }

  // kalan tahmin sayısını güncelliyoruz ve oyunun kazanma/ kaybetme koşullarını kontrol ediyoruz
  guessLeft.innerText = maxGuessess;
  if(correctLetters.length === word.length) {
    alert(`Tebrikler kelimeyi buldunuz : ${word.toUpperCase()}`);
    startNewGame();
  } else if (maxGuessess <1){
    alert("Oyun bitti");
    // Inputlara doğru harfleri yazdırıyoruz
    for(let i=0; i<word.length;){
        inputs.querySelectorAll("input")[i].value = word[i];
    }
  }

  // giriş alanını temizliyoruz
  typeInput.value = "";
}

// ipucu elementini gösteren fonksiyon
function showHintElement (){
    hintElement.style.display = "block";
    hintElement.style.opacity = "1";
}

// olay dinleyicilerini ayarlıyoruz
resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

// yeni bir oyun başlatıyoruz
startNewGame();