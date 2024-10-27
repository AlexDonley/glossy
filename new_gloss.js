const newLineTemplate = document.querySelector("[line-entry-template]")
const gridColumn = document.getElementById('gridColumn')

var lineCount = 0
var totalLines = 0

function addNewLine() {
    const newLine = newLineTemplate.content.cloneNode(true)
    for (var i = 0; i < newLine.children.length; i++) {
        var child = newLine.children[i]
        child.classList.add('line' + lineCount)

        if (i == 1) {
            
            command = "deleteLine("+ lineCount +")"
            
            child.setAttribute('onclick', command)
        }
    }
    
    gridColumn.append(newLine)
    lineCount++
    totalLines++
}

function deleteLine(n) {
    
    if (totalLines > 1) {
        lineElements = document.getElementsByClassName('line' + n);
        console.log(lineElements)
    
        while(lineElements[0]) {
            lineElements[0].parentNode.removeChild(lineElements[0]);
        }

        totalLines--
    }
}

addNewLine()