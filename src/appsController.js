export var APPS = {}
// APPS - storing in string keys of app names
// the actual appp's config isn't changed ever
// we store needed infos in its key
// also the app in the app key of its name key

import { addAppPreviewIcon } from "./previewIconController.js"

export var appsToLoad = ["example", "example2"]

export async function importAppModule(name) {
	let path = `./apps/${name}/app.js`
	let loaded = await import(path)
	return loaded
}

export function loadApp(appModule) {
	let app = appModule.default
	APPS[app.name] = app
	app.windows = []
	// assign fileicons, openwith and similar stuff
	addAppPreviewIcon(app)
}

export async function loadApps() {
	for (let app of appsToLoad) {
		let importedApp = await importAppModule(app)
		loadApp(importedApp)
	}
}
