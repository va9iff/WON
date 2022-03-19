let el = (t, c) => {
  let _el = document.createElement(t)
  _el.className = c
  return _el
}

import { APPS } from "../appsController.js"
import { refreshAppPreviewIcon } from "../previewIconController.js"

import {addWindowPreview} from '../windowPreviewController.js'

let desktop = document.querySelector("#desktop")

let maximizeSnapHighligt = document.querySelector("#maximizeSnapHighligt")
let leftSnapHighligt = document.querySelector("#leftSnapHighligt")
let rightSnapHighligt = document.querySelector("#rightSnapHighligt")


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

    // console.log(this.TOP)
  }
  // tbh we don't need closing anim id. we won't cancel closing, but whatever.
  closingID = null
  close(e) {
    this.TOP.classList.add("closing")
    this.closingID = setTimeout(()=>this.TOP.remove(), 220)
    console.log("close", this.app.name)
    // !!anmapp
    if(this.app.windows)this.app.windows = this.app.windows.filter(
      w => w != this
    )
    this.preview.remove()
    refreshAppPreviewIcon(this.app)
  }
  checkMaximize(){
    if (!this.isMaximized) return this.maximize()
    this.unMaximize()
  }
  maximize() {
    this.TOP.classList.add('maximized')
    this.isMaximized = true
    this.hideSnapHighlights()
  }
  // TODO !!!! custom resize logic to modify .w and .h.
  // native resize collides cuz it's inline
  // we've made it work, but we need resizer for all sides too.
  unMaximize() { //woah how useful function
    if(this.y<0) this.y = 0
    // if(this.x>window.innerWidth-this.wi) this.x = -this.w/2
    this.isMaximized = false
    // this.TOP.style.borderRadius = '50%'
    this.TOP.classList.remove('maximized')
    this.TOP.classList.remove('snappedLeft')
    this.TOP.classList.remove('snappedRight')
    this.refresh()
  }
  resize(e) {
    this.checkMaximize()
    // this.refresh()
  }
  bringForward() {
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
    this.preview.onclick = e => this.unMinimize()
    // this.preview.onmouseover = e => this.bringForward()

    this.topBar = this.TOP.querySelector(".windowTopBar")
    this.topBar.onmousedown = e =>{
      this.startDragging(e)
    }
    this.topBar.ondblclick = e =>{
      this.checkMaximize()
    }
  }
  unMinimize() {
    this.TOP.style.display = "flex"
    this.bringForward()
    if (this.minimizingID) {
      clearTimeout(this.minimizingID)
      this.minimizingID = null
    }
    this.TOP.classList.remove("minimizing")
  }
  minimizingID = null
  minimize() {
    this.TOP.classList.add("minimizing")
    clearTimeout(this.minimizingID)
    this.minimizingID = setTimeout(()=>this.TOP.style.display = "none",220)
  }
  snapLeft() {
    this.isMaximized = true
    this.x = -this.w/4
    this.TOP.classList.add('snappedLeft')
    this.hideSnapHighlights()
    this.refresh()
  }
  snapRight() {
    this.isMaximized = true
    this.x = window.innerWidth-this.w/4*3
    this.TOP.classList.add('snappedRight')
    this.hideSnapHighlights()
    this.refresh()
  }
  addStartBarPreview() {}

  // draggabmle window feature
  startDragging(e) {
    if(!this.isMaximized){
      this.w = this.TOP.getBoundingClientRect().width
      this.h = this.TOP.getBoundingClientRect().height
    }
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

    // maximize on top snap
    if(this.y<0) this.maximize()
    // snap sides
    if(this.x+this.w/4<0) this.snapLeft()
    if(this.x>window.innerWidth-this.w/4*3) this.snapRight()
    // minimize on bottom snap
    if(this.y>window.innerHeight-30) {
      this.minimize()
      this.y = window.innerHeight - this.h - 70
      this.refresh()
    }
  }
  hideSnapHighlights(){
    maximizeSnapHighligt.classList.remove("highlight")
    leftSnapHighligt.classList.remove("highlight")
    rightSnapHighligt.classList.remove("highlight")
  }
  checkSnapHighlights(e){
    if(this.x+this.w/4<0) {
      this.hideSnapHighlights()
      return leftSnapHighligt.classList.add("highlight")
    }
    if(this.x>window.innerWidth-this.w/4*3) {
      this.hideSnapHighlights()
      return rightSnapHighligt.classList.add("highlight")
    }
    if(this.y<0) {
      this.hideSnapHighlights()
      return maximizeSnapHighligt.classList.add("highlight")
    }

    this.hideSnapHighlights()


    // minimize on bottom snap
    // if(this.y>window.innerHeight-30) {


  }
  drag(e) {
    this.checkSnapHighlights()
    if(this.isMaximized) {
      this.y = 0
      this.unMaximize()
      this.x = e.clientX - this.w/2
      // this.refresh()
    }
    e = e || window.event
    e.preventDefault()
    this.dx = e.clientX - this.startX
    this.dy = e.clientY - this.startY

    // re new the old starting positions
    this.startX = e.clientX
    this.startY = e.clientY

    this.x = this.x + this.dx
    this.y = this.y + this.dy    

    this.refresh()
  }
}
