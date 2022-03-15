let el = (t, c) => {
  let _el = document.createElement(t)
  _el.className = c
  return _el
}

import { APPS } from "../appsController.js"
import { refreshAppPreviewIcon } from "../previewIconController.js"

import {addWindowPreview} from '../windowPreviewController.js'

let desktop = document.querySelector("#desktop")

var topZ = 0

export class Window {
  static ALL = [] // !SHOULD be re assigned in extendeds
  static NAM = "exampleApp"
  static SRC = "src/apps/example/index.html"
  x = 80  // for calcing dragging. don't set
  y = 80  // for calcing dragging. don't set
  w = 540 // width
  h = 360 // height
  isMaximized = false
  set position(nposArray){ //for setting position
    this.x = nposArray[0]
    this.y = nposArray[1]
    this.TOP.style.setProperty("--x", this.x + "px")
    this.TOP.style.setProperty("--y", this.y + "px")

  }
  constructor(app, url) {
    this.app = app
    this.url = url
    // V!!anmapp AGAIN, another ? for anonymous app windows
    // they will have windows prop on app obbjects.
    this.app.windows.push(this)
    addWindowPreview(this)
    refreshAppPreviewIcon(app)
    this.makeWindowElement()
  }
  open() {}
  // we won't call this function alone. it's called in constructor.
  // so default arguments doesn't make sense tbh
  makeWindowElement(x=80, y=80) {
    this.TOP = el("div", "window")
    this.TOP.id = this.app.name + this.app

    // !!! make title bar show title tag's innerHTML
    this.TOP.innerHTML = `
      <div class="windowTopBar">
        <div class="windowTopBarLeft">
          <img class="windowAppIcon" src="${this.app.icon}"></img>
        </div>
        <div class="windowTopTitleBar">${this.app.name}</div>
        <div class="windowTopBarRight">
          <button class="minimizeWindow">-</button>
          <button class="resizeWindow">O</button>
          <button class="closeWindow">x</button>
        </div>
      </div>
      <div class="windowContent">
        <iframe src="${this.url}" frameborder="0" class="windowPage"></iframe>
      </div>
    `
    desktop.appendChild(this.TOP)
    this.frame = this.TOP.querySelector("iframe")

    this.x = x
    this.y = y

    this.TOP.style.zIndex = topZ
    topZ++

    this.TOP.style.setProperty("--x", this.x + "px")
    this.TOP.style.setProperty("--y", this.y + "px")

    this.addListeners()
    refreshAppPreviewIcon(this.app)

    this.refresh()
  }
  refresh(){
    this.TOP.style.width = "var(--w)"
    this.TOP.style.height = "var(--h)"


    this.TOP.style.setProperty("--x", this.x + "px")
    this.TOP.style.setProperty("--y", this.y + "px")

    this.TOP.style.setProperty("--w", this.w + "px")
    this.TOP.style.setProperty("--h", this.h + "px")

    console.log(this.TOP)
  }
  close(e) {
    this.TOP.remove()
    console.log("close", this.app.name)
    // !!anmapp
    if(this.app.windows)this.app.windows = this.app.windows.filter(
      w => w != this
    )
    this.preview.remove()
    refreshAppPreviewIcon(this.app)
  }
  maximize(){
    this.TOP.style.setProperty("--x", 0)
    this.TOP.style.setProperty("--y", 0)

    // this.TOP.style.setProperty("--w", "100%")
    // this.TOP.style.setProperty("--h", "100%")

    this.TOP.style.width = "100%"
    this.TOP.style.height = "100%"
    // !!
    // this.TOP.style.setProperty("--window-border-radius", 0)

    this.isMaximized = true
    // we don't need to track the previous. we don't change them.
    // 0 is 0 and 100% is even string. just override the styles for now.
  }
  unMaximize(){ //woah how useful function
    this.isMaximized = false
    this.refresh()
  }
  resize(){
    if (!this.isMaximized) return this.maximize()
    this.isMaximized = false
    this.refresh()
  }
  bringForward(){
    this.TOP.style.zIndex = topZ++
  }
  addListeners() {
    this.TOP.addEventListener("mousedown",()=>this.bringForward())

    // in the top window element, the only unique thing is its id.
    // so bind everything by this.
    this.TOP.querySelector(".closeWindow").onclick = e => this.close(e)
    this.TOP.querySelector(".closeWindow").onmousedown = e => e.stopPropagation()

    this.TOP.querySelector(".resizeWindow").onclick = e => this.resize(e)
    this.TOP.querySelector(".minimizeWindow").onclick = e => this.minimize(e)
    this.preview.onclick = e => this.TOP.style.display = "flex"

    this.TOP.querySelector(".windowTopBar").onmousedown = e =>
      this.startDragging(e)
  }
  minimize(){
    this.TOP.style.display = "none"
  }
  addStartBarPreview() {}

  // draggabmle window feature
  startDragging(e) {
    e.preventDefault()
    // get the mouse cursor position at startup:
    this.startX = e.clientX
    this.startY = e.clientY
    document.onmouseup = e => this.stopDragging(e)
    document.onmousemove = e => this.drag(e)
    document.documentElement.style.setProperty("--iframe-pointer-event", "none")
  }
  stopDragging(e) {
    // stop moving when mouse button is released:
    document.onmouseup = null
    document.onmousemove = null
    document.documentElement.style.setProperty("--iframe-pointer-event", "auto")
  }
  drag(e) {
    e = e || window.event
    e.preventDefault()
    this.dx = e.clientX - this.startX
    this.dy = e.clientY - this.startY

    // re new the old starting positions
    this.startX = e.clientX
    this.startY = e.clientY

    this.x = this.x + this.dx
    this.y = this.y + this.dy

    // set the element's new position:
    // this.TOP.style.setProperty("--x", this.x + "px")
    // this.TOP.style.setProperty("--y", this.y + "px")
    // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    this.isMaximized=false
    this.refresh()
  }
}
