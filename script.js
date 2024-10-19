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

    checkClass = e.target.classList

    if (checkClass.contains('snip')) {
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
    if (checkClass.contains('menu-background')) {
        toggleMenu()
    }
    if(checkClass.contains('entry')) {
        
        if(checkClass.contains('new')) {
            checkClass.remove('new')
        } else {
            checkClass.add('new')
        }

        
    }
});

function addGloss(n) {
    newEntry = document.createElement('div')
    newEntry.classList = 'entry new draggable'
    newEntry.setAttribute("draggable", true)
    
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
    
    newEntry.append(chinSpan)

    glossEntries.prepend(newEntry)

    updateDraggables()
}

function updateDraggables() {
    draggables = document.querySelectorAll('.draggable')

    draggables.forEach(item => {
        item.addEventListener('dragstart', () => {
            console.log('drag start')
            item.classList.add('dragging')
        })

        item.addEventListener('dragend', () => {
            console.log('drag end')
            item.classList.remove('dragging')
        })
    })
}

glossEntries.addEventListener('dragover', e => {
    // console.log('dragging over')
    e.preventDefault()
    const afterElement = placeDraggedElement(e.clientY)
    console.log(afterElement)

    currentDrag = document.querySelector('.dragging')

    if (afterElement == null) {
        glossEntries.appendChild(currentDrag)
    } else {
        glossEntries.insertBefore(currentDrag, afterElement)
    }
})

function placeDraggedElement(y) {
    const draggableElements = [...document.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height/2
            if (offset < 0 && offset > closest.offset){
                return { offset: offset, element: child}
            } else {
                return closest
            }

    }, {offset: Number.NEGATIVE_INFINITY}).element
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
