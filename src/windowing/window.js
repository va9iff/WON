let el = (t, c) => {
  let _el = document.createElement(t)
  _el.className = c
  return _el
}

export class Window {
  static ALL = [] // !SHOULD be re assigned in extendeds
  static NAM = "exampleApp"
  static SRC = ""
  x = 80
  y = 80
  constructor() {
    this.constructor.ALL.push(this)
  }
  open() {}
  makeWindowElement(x, y) {
    this.TOP = el("div", "window")
    this.TOP.id = this.constructor.NAM + this.constructor.ALL.length
    this.TOP.innerHTML = `
			<div class="windowTopBar">
				<div class="windowTopBarLeft">
					<div class="windowAppIcon">!!#</div>
				</div>
				<div class="windowTopTitleBar">!!title</div>
				<div class="windowTopBarRight">
					<button class="minimizeWindow">-</button>
					<button class="resizeWindow">O</button>
					<button class="closeWindow">x</button>
				</div>
			</div>
			<div class="windowContent">
				<iframe src="${this.constructor.SRC}" frameborder="0" class="windowPage"></iframe>
			</div>
		`
    document.querySelector("#desktop").appendChild(this.TOP)

    this.x = x | 50
    this.y = y | 50

    this.TOP.style.setProperty("--x", this.x + "px")
    this.TOP.style.setProperty("--y", this.x + "px")
    this.addListeners()
  }
  close(e) {
    this.TOP.remove()
  }
  addListeners() {
    // in the top window element, the only unique thing is its id.
    // so bind everything by this.
    this.TOP.querySelector(".closeWindow").onclick = e => this.close(e)
    this.TOP.querySelector(".windowTopBar").onmousedown = e =>
      this.startDragging(e)
  }

  // draggabmle window feature
  startDragging(e) {
    e.preventDefault()
    // get the mouse cursor position at startup:
    this.startX = e.clientX
    this.startY = e.clientY
    document.onmouseup = e => this.stopDragging(e)
    document.onmousemove = e => this.drag(e)
  }
  stopDragging(e) {
    // stop moving when mouse button is released:
    document.onmouseup = null
    document.onmousemove = null
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
    this.TOP.style.setProperty("--x", this.x + "px")
    this.TOP.style.setProperty("--y", this.y + "px")
    // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    // console.log(this.x, this.TOP.style.getPropertyValue('--x'))
  }
}
