const BASE = "http://127.0.0.1:8080/"

var files_container = document.querySelector("#files")
var currentPath = []


function downloadUsingAnchorElement(fileName, url) {
	let path = BASE + url
	console.log(path)
	anchor = document.createElement("a")
    // !!! we need improvements on unescaping
	// anchor.href = path.replace("%3E", ">")
    anchor.href = path
	anchor.download = fileName

	document.body.appendChild(anchor)
	anchor.click()
	anchor.remove()
}

async function refresh() {
    path = ">"+currentPath.join(">")
	let response = await browse(path)
    console.log(response)
	let folder = response.data

	files_container.innerHTML = ""
	for (fileName of folder.directory) {
		let fileElement = document.createElement("div")
		fileElement.className = "file"
		fileElement.innerHTML = fileName
		fileElement.onclick = fileClick
		files_container.appendChild(fileElement)
	}
}

function fileClick() {
	let path = unescape(this.innerHTML)
	currentPath.push(path)
	refresh()
}

function back(){
    currentPath.pop()
    refresh()
}

document.querySelector(".back").onclick = back


refresh("")

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
