import {Window} from './windowing/window.js'


export var APPS = {}
// storing in string keys of app names
// the actual appp's config isn't changed ever
// we store needed infos in its key
// also the app in the app key of its name key


var appsToLoad = [
	'example',
	'example2',
]



async function importApp(name){
	let path = `./apps/${name}/app.js`
	let loaded = await import(path)
	return loaded
}

var appPreviewIconsBar = document.querySelector('#appsBar')

export function refreshAppPreviewIcon(appName){
	if (APPS[appName].windows.length==0) {
		return hideAppPreviewIcon(appName)
	} else {
	showAppPreviewIcon(appName)}
}

function showAppPreviewIcon(appName){
	APPS[appName].startBarAppIcon.style.display = 'block'
}

function hideAppPreviewIcon(appName){
	APPS[appName].startBarAppIcon.style.display = "none"
}

function addAppPreviewIcon(appName){
	// console.log('prev', app,'888')
	// console.log(APPS[app.name].windows.length)

	APPS[appName].startBarAppIcon = document.createElement('div')
	APPS[appName].startBarAppIcon.id = appName + "StartBarIcon"
	APPS[appName].startBarAppIcon.className = "startBarAppIcon"
	appPreviewIconsBar.appendChild(APPS[appName].startBarAppIcon)

	// app icon
	APPS[appName].startBarAppIcon.innerHTML = appName[0]

	APPS[appName].appsBarContainer = document.createElement('div')
	APPS[appName].appsBarContainer.id = appName
	APPS[appName].appsBarContainer.className = "appsBarContainer"
	APPS[appName].startBarAppIcon.appendChild(APPS[appName].appsBarContainer)

	APPS[appName].centeredAppPreviewContainer = document.createElement('div')
	APPS[appName].centeredAppPreviewContainer.id = appName
	APPS[appName].centeredAppPreviewContainer.className = "centeredAppPreviewContainer"
	APPS[appName].appsBarContainer.appendChild(APPS[appName].centeredAppPreviewContainer)

}


function loadApp(appModule){
	let app = appModule.default
	APPS[app.name] = {}
	let theApp = APPS[app.name]

	theApp.windows = []
	theApp.app = app
  // assign fileicons, openwith and other stuff

	addAppPreviewIcon(app.name)

}

export function apps(appname){
	return APPS[appname]
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
	refreshAppPreviewIcon("example")
	refreshAppPreviewIcon("example2")
}

starter()

