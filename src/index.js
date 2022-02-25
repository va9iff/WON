import {Window} from './windowing/window.js'


export var APPS = {}


var appsToLoad = [
	'example',
	'example2',
]



async function importApp(name){
	let path = `./apps/${name}/app.js`
	let loaded = await import(path)
	return loaded
}

function loadApp(appModule){
	let app = appModule.default
	APPS[app.name] = {}
	let theApp = APPS[app.name]

	theApp.windows = []
	theApp.app = app
  // assign fileicons, openwith and other stuff
}



// console.log('fas')

async function starter(){
	
	for (let app of appsToLoad){
		let importedApp = await importApp(app)
		loadApp(importedApp)
	}

	window.A = APPS
	console.log(A)


	new Window(APPS['example'].app).makeWindowElement(50,60)
	new Window(APPS['example'].app).makeWindowElement(50,60)
	new Window(APPS['example2'].app).makeWindowElement(50,60)
}

starter()

