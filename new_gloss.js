const newLineTemplate = document.querySelector("[line-entry-template]")
const gridColumn = document.getElementById('gridColumn')

lineCount = 0

console.log(newLineTemplate)

function addNewLine() {
    const newLine = newLineTemplate.content.cloneNode(true)
    for (var i = 0; i < newLine.children.length; i++) {
        var child = newLine.children[i]
        child.classList.add('line' + lineCount)
    }
    gridColumn.append(newLine)
    lineCount++
}

addNewLine()