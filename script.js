const highLight = document.getElementById('highLight')
const fullText = document.getElementById('fullText')
const glossBox = document.getElementById('glossBox')
const glossEntries = document.getElementById('glossEntries')
const textSelector = document.getElementById('textSelector')
const textNames = document.getElementById('textNames')

var text_size = 20
var gloss_size = 50
var menuTog = true

let translated = []
const punctuation = ".,!?:;'\"/(){}[]~`|-_+=@#$%^&*"
let currentSentences;


function getSentenceJSON(name) {
  fetch("./data/" + name + ".json")
    .then(res => res.json())
    .then(data => {
      currentSentences = data
      //console.log(currentSentences)
      clearAll()
      setSentence(currentSentences)
      toggleMenu()
    })
}


function setSentence(arr){
    n = 0
    fullText.innerHTML = ''
    
    arr.forEach((set) => {
        newSpan = document.createElement('span')
        newSpan.innerText = set.english
        
        if (!punctuation.includes(set.english)) {
            
            newSpan.id = "n" + n
            newSpan.classList += "snip " + set.pos
        }
        
        fullText.append(newSpan)
        fullText.innerHTML += "<span> </span>"

        n++
    })
}


window.addEventListener('mousedown', (e) => {
    // console.log(e.target);

    if (e.target.classList.contains('snip')) {
        targetIndex = e.target.id.substring(1)
        
        targetWord = currentSentences[targetIndex].english
        
        highLight.innerText = targetWord
        highLight.style.fontSize = 1000 / (targetWord.length + 4) + "pt"

        let translation_check = targetWord.toLowerCase() + "_" + currentSentences[targetIndex].chinese
        console.log(translation_check)

        if (!translated.includes(translation_check)) {
            addGloss(targetIndex)
            translated.push(translation_check)
        }

        pickElement = document.getElementById(e.target.id)
        if (!pickElement.classList.contains('color')) {
            pickElement.classList += ' color'
        }
    }
    if (e.target.classList.contains('menu-background')) {
        toggleMenu()
    }
});

function addGloss(n) {
    newEntry = document.createElement('div')
    newEntry.classList = 'entry'
    
    engSpan = document.createElement('span')
    engSpan.innerText = currentSentences[n].english
    engSpan.classList = 'word english'
    
    newEntry.append(engSpan)

    chinSpan = document.createElement('span')
    chinSpan.innerText = currentSentences[n].chinese
    chinSpan.classList = 'word chinese'
    
    prevNew = document.getElementsByClassName('new')
    if (prevNew[0]){
        prevNew[0].classList.remove('new')
    }

    newEntry.classList.add('new')
    
    newEntry.append(chinSpan)

    glossEntries.prepend(newEntry)
}

function changeTextSize(n, str) {
    
    if (str == fullText) {
        text_size += n
        if (text_size < 0) {
            text_size -= n
        }

        str.style.fontSize = text_size + "pt"
    } else if (str == glossEntries) {
        gloss_size += n
        if (gloss_size < 0) {
            gloss_size -= n
        }

        str.style.fontSize = gloss_size + "pt"
    }
}

function clearAll() {
    highLight.innerText = ''
    fullText.innerText = ''
    clearGlosses()
}

function clearGlosses() {
    glossEntries.innerHTML = ""
    translated = []
}

function flipGlosses() {
    for (var i = 1; i < glossEntries.childNodes.length; i++){
        glossEntries.insertBefore(glossEntries.childNodes[i], glossEntries.firstChild);
    }
    prevNew = document.getElementsByClassName('new')
    if (prevNew[0]){
        prevNew[0].classList.remove('new')
    }
}

function toggleMenu() {
    if (menuTog) {
        menuTog = false
        textSelector.classList.add('hide')
    } else {
        menuTog = true
        textSelector.classList.remove('hide')
    }
}

function dehighlightText() {
    highlighted = document.querySelectorAll('.color')
    
    Array.from(highlighted).forEach((el) => {
        el.classList.remove('color')
    })
}
