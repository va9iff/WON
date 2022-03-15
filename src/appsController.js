export var APPS = {}
// APPS - storing in string keys of app names
// the actual appp's config isn't changed ever
// we store needed infos in its key
// also the app in the app key of its name key

import { addAppPreviewIcon, refreshAppPreviewIcon } from "./previewIconController.js"
import { desktopIcon } from "./desktop/desktopIcons.js"
import { Window } from "./windowing/window.js"

export var appsToLoad = ["example", "files", "image-viewer"]

export async function importAppModule(name) {
	let path = `./apps/${name}/app.js`
	let loaded = await import(path)
	return loaded
}

// pass object; returns proper app object
// but we won't use it, as anonymous apps don't fit our system
// instead, we can dynamically load apps using loadApp :25
// and doesn't give full Proper app object. we fullfill on loadApp
// and calling this become useless, we call loadApp with raw app obj
// so currently, anonymous apps aren't real for us
export function appify(app){
	app.windows = []
	return app
}

export function launch(appName){
	let app = APPS[appName]
	let win = new Window(app,app.home)
	return win

}

export function loadApp(appModule) {
	let app = appModule
	app = appify(app) // fix the missed keys
	APPS[app.name] = app
	// assign fileicons, openwith and similar stuff
	formatAppUrls(app)
	addAppPreviewIcon(app)
	refreshAppPreviewIcon(app)
}

function formatUrl(app,[urls]){
	for (url of urls){
		app[url] = app[url].replace("$WON",WONU)
	}
}

const urlsToFormat = [
	"home",
	"icon",
	"open",
]

function formatAppUrls(app){
	for (let url of urlsToFormat){
		app[url]=app[url]?.replace('$WON',WONU)
	}
}

export async function loadApps() {
	for (let appName of appsToLoad) {
		let importedApp = await importAppModule(appName)
		loadApp(importedApp.default)
		new desktopIcon(APPS[appName]).add()
	}
}


window.launch = launch