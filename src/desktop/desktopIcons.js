var desktopAppIcons = document.querySelector('#desktopAppIcons')

import {Window} from "../windowing/window.js"
import {launch} from "../appsController.js"

export class desktopIcon{
	constructor(app){
		this.app = app
		this.icon = document.createElement('button')
		app.desktopIcon = this.icon
		app.desktopIcon.className = "dekstopIcon example1"
		app.desktopIcon.innerHTML = `
          <img src="${app.icon}" class="desktopIconImage"></img>
          <h3 class="desktopIconCaption">${app.name}</h3>
        `
        app.desktopIcon.ondblclick = ()=> launch(app.name)
	}
	add(){
		desktopAppIcons.appendChild(this.icon)
	}
}