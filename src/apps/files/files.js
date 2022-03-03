const BASE = "http://127.0.0.1:8080/"

// => json
async function browseAt(path) {
    let url = BASE + path
    let data = await fetch(url)
    let folder = await data.json()
    return folder
    // downloadUsingAnchorElement(folder.directory[2])
}

// browseAt("src/apps/files/fakedirGET.json")

var files_container = document.querySelector("#files")

function downloadUsingAnchorElement(fileName,url) {
    let path = BASE + url
    console.log(path)
    anchor = document.createElement("a")
    anchor.href = path
    anchor.download = fileName

    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
}

var downloadFile = fileName => {
    let path = BASE + fileName
    console.log(BASE, fileName)
    let result = fetch(path)
    result
        .then(res => {
            return res.text()
        })
        .then(res => {})
}

async function buildFilesView(path){
    let folder = await browseAt(path)
    for (fileName of folder.directory){
        let fileElement = document.createElement("div")
        fileElement.className = "file"
        fileElement.innerHTML = fileName
        fileElement.onclick = function () {
            console.log(folder.path)
            downloadUsingAnchorElement(this.innerHTML, folder.path + this.innerHTML)
        }
        files_container.appendChild(fileElement)
    }
}

buildFilesView('src/apps/files/fakedirGET.json')

// for (file of directory) {
    // let fileElement = document.createElement("div")
    // fileElement.className = "file"
    // fileElement.innerHTML = file.name
    // fileElement.onclick = function () {
        // console.log(this)
        // downloadUsingAnchorElement(this.innerHTML)
    // }
    // files_container.appendChild(fileElement)
// }
// 