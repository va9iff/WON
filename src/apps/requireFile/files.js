const BASE = "http://127.0.0.1:8080/"

var files_container = document.querySelector("#files")
// ! starting with > doesn't work on our flask app when we want file.
var currentPath = []

async function anchorBlobDownloader(response) {

	// 
	// 
	// function download(text, name, type) {
	  // var a = document.createElement("a")
	  // document.body.appendChild(a)
	  // var file = new Blob([text], {type: type});
	  // a.href = URL.createObjectURL(file);
	  // a.download = name;
	  // a.click()
	  // a.remove()
	// }
	// let fileName = currentPath.pop()
// 
	// download(response.data, fileName, "image/png")



// 
// 
	// console.log(response)
	// Buffer.from(response.data).toString('base64');

// 
	// var url = window.URL.createObjectURL(blob)
	// var a = document.createElement("a")
	// a.href = url
	// a.download = "filename.xlsx"
	// document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox
	// a.click()
	// a.remove() //afterwards we remove the element again
}

function downloadUsingAnchorElement(fileName, url) {
	let path = BASE + url
	anchor = document.createElement("a")
	// !!! we need improvements on unescaping
	anchor.href = path
	anchor.download = fileName

	document.body.appendChild(anchor)
	anchor.click()
	anchor.remove()
}

async function refresh() {
	// :4
	let path = ".>" + currentPath.join(">")
	console.log(path)
	let response = await browse(path)

	if (!response.directory) {
		// it's not just frontent thing. it's related to flask backend.
		let res = await fetch("http://127.0.0.1:5000/browse/"+path)
		let blob = await res.blob()

        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = currentPath.pop()
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();    
        a.remove();  //afterwards we remove the element again         


		console.log(blob)
		anchorBlobDownloader(response)
		currentPath.pop()
		return response
	}

	let folder = response.directory
	files_container.innerHTML = ""
	for (fileName of folder) {
		let fileElement = document.createElement("div")
		fileElement.className = "file"
		fileElement.innerHTML = fileName
		fileElement.onclick = fileClick
		files_container.appendChild(fileElement)
	}
}

function fileClick() {
	let path = this.innerHTML
	currentPath.push(path)
	refresh()
}

function back() {
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
