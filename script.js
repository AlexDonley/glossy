const highLight = document.getElementById('highLight')
const fullText = document.getElementById('fullText')
const glossBox = document.getElementById('glossBox')
const glossEntries = document.getElementById('glossEntries')

var text_size = 20
var gloss_size = 50

sampleDict = [
    {
      "english": "China",
      "chinese": "中國",
      "pos": "noun"
    },
    {
      "english": ",",
      "chinese": "",
      "pos": ""
    },
    {
      "english": "baby",
      "chinese": "嬰兒, 寶貝",
      "pos": "noun"
    },
    {
      "english": ",",
      "chinese": "",
      "pos": ""
    },
    {
      "english": "how's it going",
      "chinese": "怎麼樣了",
      "pos": "phrase"
    },
    {
      "english": "?",
      "chinese": "",
      "pos": ""
    },
    {
      "english": "Yes",
      "chinese": "是的",
      "pos": "ex"
    },
    {
      "english": ",",
      "chinese": ",",
      "pos": ""
    },
    {
      "english": "I",
      "chinese": "我",
      "pos": "pro"
    },
    {
      "english": "know",
      "chinese": "知道",
      "pos": "verb"
    },
    {
      "english": "I",
      "chinese": "我",
      "pos": "pro"
    },
    {
      "english": "owe",
      "chinese": "欠",
      "pos": "verb"
    },
    {
      "english": "you",
      "chinese": "你",
      "pos": "pro"
    },
    {
      "english": "a lot of",
      "chinese": "很多",
      "pos": "adj"
    },
    {
      "english": "money",
      "chinese": "錢",
      "pos": "noun"
    },
    {
      "english": ".",
      "chinese": "。",
      "pos": ""
    },
    {
      "english": "Always",
      "chinese": "總是",
      "pos": "adv"
    },
    {
      "english": "making it about",
      "chinese": "以金_為重",
      "pos": "verb"
    },
    {
      "english": "money",
      "chinese": "錢",
      "pos": "noun"
    },
    {
      "english": ".",
      "chinese": "。",
      "pos": ""
    },
    {
      "english": "You know what",
      "chinese": "你知道嗎",
      "pos": "phrase"
    },
    {
      "english": ",",
      "chinese": ",",
      "pos": ""
    },
    {
      "english": "listen",
      "chinese": "聽",
      "pos": "verb"
    },
    {
      "english": ".",
      "chinese": "",
      "pos": ""
    },
    {
      "english": "I",
      "chinese": "我",
      "pos": "pro"
    },
    {
      "english": "will",
      "chinese": "將要",
      "pos": "verb"
    },
    {
      "english": "get it to",
      "chinese": "給",
      "pos": "verb"
    },
    {
      "english": "you",
      "chinese": "你",
      "pos": "pro"
    },
    {
      "english": "tomorrow",
      "chinese": "明天",
      "pos": "noun"
    },
    {
      "english": ".",
      "chinese": "。",
      "pos": ""
    },
    {
      "english": "Do you have",
      "chinese": "你有",
      "pos": "phrase"
    },
    {
      "english": "like",
      "chinese": "大約",
      "pos": "adv"
    },
    {
      "english": "four trillion dollars",
      "chinese": "四兆美元",
      "pos": "noun"
    },
    {
      "english": "I",
      "chinese": "我",
      "pos": "pro"
    },
    {
      "english": "could",
      "chinese": "可以",
      "pos": "verb"
    },
    {
      "english": "borrow",
      "chinese": "借",
      "pos": "verb"
    },
    {
      "english": "?",
      "chinese": "？",
      "pos": ""
    },
    {
      "english": "What",
      "chinese": "什麼",
      "pos": "quest"
    },
    {
      "english": "am",
      "chinese": "是",
      "pos": "verb"
    },
    {
      "english": "I",
      "chinese": "我",
      "pos": "pro"
    },
    {
      "english": "saying",
      "chinese": "在說",
      "pos": "verb"
    },
    {
      "english": ",",
      "chinese": ",",
      "pos": ""
    },
    {
      "english": "you're",
      "chinese": "你是",
      "pos": "phrase"
    },
    {
      "english": "Canada",
      "chinese": "加拿大",
      "pos": "noun"
    },
    {
      "english": ".",
      "chinese": "",
      "pos": ""
    },
    {
      "english": "Okay",
      "chinese": "好的",
      "pos": "ex"
    },
    {
      "english": ",",
      "chinese": ",",
      "pos": ""
    },
    {
      "english": "listen",
      "chinese": "聽",
      "pos": "verb"
    },
    {
      "english": ".",
      "chinese": "。",
      "pos": ""
    },
    {
      "english": "I",
      "chinese": "我",
      "pos": "pro"
    },
    {
      "english": "will",
      "chinese": "會",
      "pos": "verb"
    },
    {
      "english": "give",
      "chinese": "給",
      "pos": "verb"
    },
    {
      "english": "you",
      "chinese": "你",
      "pos": "pro"
    },
    {
      "english": "my",
      "chinese": "我的",
      "pos": "poss"
    },
    {
      "english": "watch",
      "chinese": "手錶",
      "pos": "noun"
    },
    {
      "english": "until",
      "chinese": "直到_為止",
      "pos": "prep"
    },
    {
      "english": "I",
      "chinese": "我",
      "pos": "pro"
    },
    {
      "english": "can",
      "chinese": "能",
      "pos": "verb"
    },
    {
      "english": "pay",
      "chinese": "付錢",
      "pos": "verb"
    },
    {
      "english": ".",
      "chinese": "。",
      "pos": ""
    },
    {
      "english": "That's",
      "chinese": "那是",
      "pos": "phrase"
    },
    {
      "english": "right",
      "chinese": "正確的",
      "pos": "adj"
    },
    {
      "english": ",",
      "chinese": ",",
      "pos": ""
    },
    {
      "english": "you",
      "chinese": "你",
      "pos": "pro"
    },
    {
      "english": "did make",
      "chinese": "確實做了",
      "pos": "verb"
    },
    {
      "english": "this",
      "chinese": "這",
      "pos": "pro"
    },
    {
      "english": ".",
      "chinese": "。",
      "pos": ""
    },
    {
      "english": "China",
      "chinese": "中國",
      "pos": "noun"
    },
    {
      "english": ",",
      "chinese": "",
      "pos": ""
    },
    {
      "english": "you",
      "chinese": "你",
      "pos": "noun"
    },
    {
      "english": "can't",
      "chinese": "不能",
      "pos": "verb"
    },
    {
      "english": "tell",
      "chinese": "告訴",
      "pos": "verb"
    },
    {
      "english": "me",
      "chinese": "我",
      "pos": "pro"
    },
    {
      "english": "what to do",
      "chinese": "該怎麼做",
      "pos": "noun"
    },
    {
      "english": ".",
      "chinese": "。",
      "pos": ""
    },
    {
      "english": "Okay",
      "chinese": "好的",
      "pos": "ex"
    },
    {
      "english": ",",
      "chinese": ",",
      "pos": ""
    },
    {
      "english": "I",
      "chinese": "我",
      "pos": "pro"
    },
    {
      "english": "will",
      "chinese": "會",
      "pos": "verb"
    },
    {
      "english": "do",
      "chinese": "做",
      "pos": "verb"
    },
    {
      "english": "that",
      "chinese": "那",
      "pos": "pro"
    },
    {
      "english": ",",
      "chinese": ",",
      "pos": ""
    },
    {
      "english": "bye",
      "chinese": "再見",
      "pos": "ex"
    },
    {
      "english": ".",
      "chinese": "。",
      "pos": ""
    },
    {
      "english": "Besties",
      "chinese": "閨蜜",
      "pos": "noun"
    },
    {
      "english": ",",
      "chinese": ",",
      "pos": ""
    },
    {
      "english": "oh",
      "chinese": "哦",
      "pos": "ex"
    },
    {
      "english": ",",
      "chinese": ",",
      "pos": ""
    },
    {
      "english": "hide",
      "chinese": "隱藏",
      "pos": "verb"
    },
    {
      "english": "me",
      "chinese": "我",
      "pos": "pro"
    },
    {
      "english": ".",
      "chinese": "。",
      "pos": ""
    },
    {
      "english": "What",
      "chinese": "什麼",
      "pos": "quest"
    },
    {
      "english": "?",
      "chinese": "？",
      "pos": ""
    },
    {
      "english": "Oh",
      "chinese": "哦",
      "pos": "ex"
    },
    {
      "english": "come on",
      "chinese": "來吧",
      "pos": "ex"
    },
    {
      "english": ",",
      "chinese": ",",
      "pos": ""
    },
    {
      "english": "you guys",
      "chinese": "你們",
      "pos": "pro"
    },
    {
      "english": "haven't dated",
      "chinese": "沒有約會過",
      "pos": "verb"
    },
    {
      "english": "since",
      "chinese": "自_以來就",
      "pos": "prep"
    },
    {
      "english": 76,
      "chinese": "1776年",
      "pos": "noun"
    },
    {
      "english": ".",
      "chinese": "。",
      "pos": ""
    },
    {
      "english": "I",
      "chinese": "我",
      "pos": "pro"
    },
    {
      "english": "know",
      "chinese": "知道",
      "pos": "verb"
    },
    {
      "english": ",",
      "chinese": ",",
      "pos": ""
    },
    {
      "english": "but",
      "chinese": "但",
      "pos": "conj"
    },
    {
      "english": "it's",
      "chinese": "它是",
      "pos": "phrase"
    },
    {
      "english": "so",
      "chinese": "太",
      "pos": "adv"
    },
    {
      "english": "awkward",
      "chinese": "尷尬",
      "pos": "adj"
    },
    {
      "english": ".",
      "chinese": "。",
      "pos": ""
    },
    {
      "english": "Well",
      "chinese": "-",
      "pos": "ex"
    },
    {
      "english": ",",
      "chinese": ",",
      "pos": ""
    },
    {
      "english": "I",
      "chinese": "我",
      "pos": "pro"
    },
    {
      "english": "told",
      "chinese": "告訴",
      "pos": "verb"
    },
    {
      "english": "you",
      "chinese": "你",
      "pos": "pro"
    },
    {
      "english": "to break up",
      "chinese": "分手",
      "pos": "verb"
    },
    {
      "english": "with him",
      "chinese": "與他",
      "pos": "pro"
    },
    {
      "english": "in person",
      "chinese": "親自",
      "pos": "adv"
    },
    {
      "english": ",",
      "chinese": ",",
      "pos": ""
    },
    {
      "english": "and",
      "chinese": "而",
      "pos": "conj"
    },
    {
      "english": "not",
      "chinese": "不是",
      "pos": "adv"
    },
    {
      "english": "over declaration",
      "chinese": "透過簡訊",
      "pos": "adv"
    },
    {
      "english": ".",
      "chinese": "。",
      "pos": ""
    },
    {
      "english": "Come on",
      "chinese": "來吧",
      "pos": "ex"
    },
    {
      "english": ",",
      "chinese": "",
      "pos": ""
    },
    {
      "english": "you",
      "chinese": "你",
      "pos": "pro"
    },
    {
      "english": "can",
      "chinese": "可以",
      "pos": "verb"
    },
    {
      "english": "do",
      "chinese": "做到",
      "pos": "verb"
    },
    {
      "english": "this",
      "chinese": "這一點",
      "pos": "pro"
    },
    {
      "english": ".",
      "chinese": "。",
      "pos": ""
    },
    {
      "english": "I",
      "chinese": "我",
      "pos": "pro"
    },
    {
      "english": "'ve got",
      "chinese": "有",
      "pos": "verb"
    },
    {
      "english": "some",
      "chinese": "一些",
      "pos": "det"
    },
    {
      "english": "hockey stuff",
      "chinese": "曲棍球的東西",
      "pos": "noun"
    },
    {
      "english": "to purchase",
      "chinese": "要買",
      "pos": "verb"
    },
    {
      "english": ".",
      "chinese": "",
      "pos": ""
    }
]

translated = []
punctuation = ".,!?:;'\"/(){}[]~`|-_+=@#$%^&*"

function setSentence(arr){
    n = 0
    
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

setSentence(sampleDict)

window.addEventListener('mousedown', (e) => {
    // console.log(e.target);

    if (e.target.classList.contains('snip')) {
        targetIndex = e.target.id.substring(1)
        
        targetWord = sampleDict[targetIndex].english
        
        highLight.innerText = targetWord
        highLight.style.fontSize = 1000 / (targetWord.length + 4) + "pt"

        if (!translated.includes(targetWord)) {
            addGloss(targetIndex)
            translated.push(targetWord)
        }

        pickElement = document.getElementById(e.target.id)
        if (!pickElement.classList.contains('color')) {
            pickElement.classList += ' color'
        }
    }
});

function addGloss(n) {
    newEntry = document.createElement('div')
    newEntry.classList = 'entry'
    
    engSpan = document.createElement('span')
    engSpan.innerText = sampleDict[n].english
    engSpan.classList = 'word english'
    
    newEntry.append(engSpan)

    chinSpan = document.createElement('span')
    chinSpan.innerText = sampleDict[n].chinese
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