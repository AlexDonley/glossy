import { 
    splitPinyin, addPinTone, charToPin,
    constructPinRT, constructZhuRT 
} from './js/ruby-text.js'
import { fillMaxFontSize } from './js/resize-text.js'

const highLight         = document.querySelector('#highLight');
const fullText          = document.querySelector('#fullText');
const glossBox          = document.querySelector('#glossBox');
const glossEntries      = document.querySelector('#glossEntries');
const textSelector      = document.querySelector('#textSelector');
const textNames         = document.querySelector('#textNames');

const growHLBtn         = document.querySelector('.grow.one');
const shrinkHLBtn       = document.querySelector('.shrink.one');
const growGlossesBtn    = document.querySelector('.grow.two');
const shrinkGlossesBtn  = document.querySelector('.shrink.two');

const menuBtn           = document.querySelector('.menu.gloss-btn');
const clearHighlightBtn = document.querySelector('.de-highlight.gloss-btn');
const clearGlossesBtn   = document.querySelector('.clear.gloss-btn');
const flipGlossesBtn    = document.querySelector('.flip.gloss-btn');

growHLBtn.addEventListener('click', changeTextSize(4, 'fullText'));
shrinkHLBtn.addEventListener('click', changeTextSize(-4, 'fullText'));
growGlossesBtn.addEventListener('click', changeTextSize(4, 'glossEntries'));
shrinkGlossesBtn.addEventListener('click', changeTextSize(-4, 'glossEntries'));

menuBtn.addEventListener('click', toggleMenu);
clearHighlightBtn.addEventListener('click', dehighlightText);
clearGlossesBtn.addEventListener('click', clearGlosses);
flipGlossesBtn.addEventListener('click', flipGlosses);

let totalGlosses = 0;
let currentIdx = -1;
let text_size = 20;
let gloss_size = 40;
let menuTog = true;

const availableGlosses = [
    'p3', 'p6', 'p7', 'p8', 'p9', 
    'p10', 'p11', 'p12', 'p13',
    'halloween', 'christmas', 'children'
]
const sessionKeys = Object.keys(sessionStorage)

let translated = []
const punctuation = ".,!?:;'\"/(){}[]~`|-—_+=@#$%^&*"
let currentSentences;


function loadTextOptions() {
    
    const allGlosses = availableGlosses
    
    sessionKeys.forEach((key) => {
        if (key.substring(0, 6) == "entry_") {
            allGlosses.push(key.substring(6))
        }
    })
    
    allGlosses.forEach(item => {
        const newOption = document.createElement('option')
        newOption.setAttribute("value", item)
        newOption.innerText = item

        textNames.append(newOption)
    })
}

loadTextOptions()

function getSentenceJSON(name) {
    const keyIndex = sessionKeys.indexOf("entry_" + name)
  
    if (keyIndex >= 0) {
        
        const userString = sessionStorage.getItem("entry_" + name)
        console.log(userString)
        currentSentences = JSON.parse(userString)

        clearAll()
        setSentence(currentSentences)
        toggleMenu()

    } else {
        fetch("./data/json/" + name + ".json")
        .then(res => res.json())
        .then(data => {
            currentSentences = data
            
            clearAll()
            setSentence(currentSentences)
            toggleMenu()

            currentIdx = -1
        })
    }
}

function setSentence(arr){
    let n = 0
    fullText.innerHTML = ''
    
    arr.forEach((set) => {
        const newSpan = document.createElement('span')
        newSpan.innerText = set.english
        
        if (!punctuation.includes(set.english)) {
            
            newSpan.id = "n" + n
            newSpan.classList += "snip " + set.pos
        }
        
        fullText.append(newSpan)
        fullText.innerHTML += "<span> </span>"

        n++
    })

    fullText.append(document.createElement('br'))
    fullText.append(document.createElement('br'))
    fullText.append(document.createElement('br'))
}

window.addEventListener('mousedown', (e) => {
    // console.log(e.target);

    const checkClass = e.target.classList

    if (checkClass.contains('snip')) {
        const targetIndex = e.target.id.substring(1)
        
        highlightTranslate(targetIndex)
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

    if(checkClass.contains('go')) {
        getSentenceJSON(textNames.value)
    }
});

function highlightTranslate(idx) {
    currentIdx = idx
    const targetWord = currentSentences[idx].english

    fillMaxFontSize(highLight, targetWord, 15);

    let translation_check = targetWord.toLowerCase() + "_" + currentSentences[idx].chinese
    console.log(translation_check)

    if (!translated.includes(translation_check)) {
        addGloss(idx)
        translated.push(translation_check)
    }

    const pickElement = document.querySelector("#n" + idx)
    if (!pickElement.classList.contains('color')) {
        pickElement.classList.add('color')
    }
}

function addGloss(n) {
    const newEntry = document.createElement('div')
    newEntry.classList = 'entry new draggable'
    newEntry.id = 'gloss' + totalGlosses
    newEntry.setAttribute("draggable", true)
    
    const engSpan = document.createElement('span')
    engSpan.innerText = currentSentences[n].english
    engSpan.classList = 'word english'
    
    newEntry.append(engSpan)

    const chinSpan = document.createElement('span')

    const chineseArr = currentSentences[n].chinese.split('');
    console.log(chineseArr);

    chineseArr.forEach(char => {
        const thisPin = charToPin(char);
        
        if (thisPin) {
            const newPinyin = constructPinRT(
                char,
                addPinTone(splitPinyin(thisPin)),
                'under'
            )
            chinSpan.append(newPinyin) 
        } else {
            chinSpan.append(char)
        }
    })
    
    chinSpan.classList = 'word chinese';    
    newEntry.append(chinSpan);

    const newCheck = document.createElement('input');
    newCheck.type = 'checkbox';
    newCheck.checked = false;
    newCheck.classList.add('py-check');
    newCheck.addEventListener('change', togglePinyin(totalGlosses));
    
    const prevNew = document.getElementsByClassName('new')
    if (prevNew[0]){
        prevNew[0].classList.remove('new')
    }

    newEntry.append(newCheck);

    glossEntries.prepend(newEntry);
    totalGlosses++



    updateDraggables()
}

function updateDraggables() {
    const draggables = document.querySelectorAll('.draggable')

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
    
    return function () {
        const thisElem = document.querySelector('#' + str);
        
        if (str == 'fullText') {
            text_size += n;
            if (text_size < 0) {
                text_size -= n;
            }
            
            thisElem.style.fontSize = text_size + "pt";

        } else if (str == 'glossEntries') {
            gloss_size += n;
            if (gloss_size < 0) {
                gloss_size -= n;
            }

            thisElem.style.fontSize = gloss_size + "pt";
        }
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
    
    const allBig = document.getElementsByClassName('new')
    Array.from(allBig).forEach(element => {
        if (element){
            element.classList.remove('new')
        }
    })
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
    const highlighted = document.querySelectorAll('.color')
    
    Array.from(highlighted).forEach((el) => {
        el.classList.remove('color')
    })
}

function togglePinyin(idx) {
   
    return function () {
        const parentElem = document.querySelector('#gloss' + idx);
        const isChecked = parentElem.querySelector('input').checked;
        const nestedRTs = parentElem.querySelectorAll('rt');
    
        if (isChecked) {
            nestedRTs.forEach(rt => {
                rt.classList.add('show')
            })
        } else {
            nestedRTs.forEach(rt => {
                rt.classList.remove('show')
            })
        }
    }
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case "ArrowUp":
        case "PageUp":
            clearGlosses();
            break;
        case "ArrowDown":
        case "PageDown":
            event.preventDefault();
            nextSnip();
            break;
        case "b":
            flipGlosses();
            break;
    }
});

function nextSnip() {
    currentIdx++
    while (
        !document.querySelector('#n' + currentIdx) 
        && currentIdx < Array.from(fullText.children).length * 2 + 1
    ) {
        currentIdx++
    }

    if (currentIdx < Array.from(fullText.children).length * 2 + 1) {
        highlightTranslate(currentIdx)
    }
}