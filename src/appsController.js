export var APPS = {}
// APPS - storing in string keys of app names
// the actual appp's config isn't changed ever
// we store needed infos in its key
// also the app in the app key of its name key

import { addAppPreviewIcon, refreshAppPreviewIcon } from "./previewIconController.js"
import { desktopIcon } from "./desktop/desktopIcons.js"
import { Window } from "./windowing/window.js"

import {require} from "./WONfun.js"

export var appsToLoad = [
// "example", 
"files", 
"image-viewer",
"code-viewer",
"markDown-viewer",
"test-1"
]

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

function WONfunify(window){
	window.frame.contentWindow.WON={}
	window.frame.contentWindow.require=require

}

function suppressResolve(win){
	win.frame.contentWindow.resolve = {}
	win.frame.contentWindow.resolve.try = ()=>{}

}

export function launchManual(app){
	let win = new Window(app,app.home)

	suppressResolve(win)
	WONfunify(win)
	return win
}


export function launch(appName){
	let app = APPS[appName]

	return launchManual(app)
}

export function loadApp(appJson) {
	let app = appJson
	app = appify(app) // fix the missed keys
	if (APPS[app.name]) return console.error('existing name while loading app "'+app.name+'"')
	APPS[app.name] = app
	// assign fileicons, openwith and similar stuff
	formatAppUrls(app)
	addAppPreviewIcon(app)
	refreshAppPreviewIcon(app)
	return app
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
		if (APPS[appName].desktopIcon) (new desktopIcon(APPS[appName]).add())
	}
}


export async function openWith(appName, file){
	let app = launch(appName)
	app.frame.contentWindow.addEventListener("load", ()=>{
		app.frame.contentWindow.openWith(file)
	})
}


window.launch = launch

window.APPS = APPS