var desktopAppIcons = document.querySelector('#desktopAppIcons')

import {Window} from "../windowing/window.js"

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
        app.desktopIcon.ondblclick = ()=> new Window(app).makeWindowElement()
	}
	add(){
		desktopAppIcons.appendChild(this.icon)
	}
}