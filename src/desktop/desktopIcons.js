var desktopAppIcons = document.querySelector('#desktopAppIcons')

import {Window} from "../windowing/window.js"
import {launch} from "../appsController.js"

export class desktopIcon{
	constructor(app){
		this.app = app
		this.icon = document.createElement('button')
		app.desktopIcon = this
		this.icon.className = "dekstopIcon example1"
		this.icon.innerHTML = `
          <img src="${app.icon}" class="desktopIconImage"></img>
          <h3 class="desktopIconCaption">${app.name}</h3>
        `
        this.icon.ondblclick = ()=> launch(app.name)
	}
	add(){
		desktopAppIcons.appendChild(this.icon)
	}
}