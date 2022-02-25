export var APPS = {}
// APPS - storing in string keys of app names
// the actual appp's config isn't changed ever
// we store needed infos in its key
// also the app in the app key of its name key


export var appsToLoad = [
	'example',
	'example2',
]

export async function importAppModule(name){
	let path = `./apps/${name}/app.js`
	let loaded = await import(path)
	return loaded
}

export function loadApp(appModule) {
	let app = appModule.default
	APPS[app.name] = {}
	let theApp = APPS[app.name]
	theApp.windows = []
	theApp.app = app
	// assign fileicons, openwith and similar stuff
	addAppPreviewIcon(app.name)
}

export async function loadApps(){
	for (let app of appsToLoad) {
		let importedApp = await importAppModule(app)
		loadApp(importedApp)
	}	
}

export var appPreviewIconsBar = document.querySelector("#appsBar")

export function refreshAppPreviewIcon(appName) {
	if (APPS[appName].windows.length == 0) {
		return hideAppPreviewIcon(appName)
	} else {
		showAppPreviewIcon(appName)
	}
}


export function showAppPreviewIcon(appName) {
	APPS[appName].startBarAppIcon.style.display = "block"
}

export function hideAppPreviewIcon(appName) {
	APPS[appName].startBarAppIcon.style.display = "none"
}

export function addAppPreviewIcon(appName) {
	// console.log('prev', app,'888')
	// console.log(APPS[app.name].windows.length)

	APPS[appName].startBarAppIcon = document.createElement("div")
	APPS[appName].startBarAppIcon.id = appName + "StartBarIcon"
	APPS[appName].startBarAppIcon.className = "startBarAppIcon"
	appPreviewIconsBar.appendChild(APPS[appName].startBarAppIcon)

	// app icon
	APPS[appName].startBarAppIcon.innerHTML = appName[0]

	APPS[appName].appsBarContainer = document.createElement("div")
	APPS[appName].appsBarContainer.id = appName
	APPS[appName].appsBarContainer.className = "appsBarContainer"
	APPS[appName].startBarAppIcon.appendChild(APPS[appName].appsBarContainer)

	APPS[appName].centeredAppPreviewContainer = document.createElement("div")
	APPS[appName].centeredAppPreviewContainer.id = appName
	APPS[appName].centeredAppPreviewContainer.className =
		"centeredAppPreviewContainer"
	APPS[appName].appsBarContainer.appendChild(
		APPS[appName].centeredAppPreviewContainer
	)
}
