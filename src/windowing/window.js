let el = (t, c) => {
  let _el = document.createElement(t)
  _el.className = c
  return _el
}

export class Window {
  static ALL = [] // !SHOULD be re assigned in extendeds
  static NAM = "exampleApp"
	static SRC = ""
  constructor() {
    this.constructor.ALL.push(this)
  }
  open() {}
  makeWindowElement() {
		this.TOP=el('div','window')
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
		document.querySelector('#desktop').appendChild(this.TOP)
  }
	addListeners(){
		// in the top window element, the only unique thing is its id.
		// so bind everything by this.
		this.TOP.querySelector('.closeWindow').onclick = this.TOP.remove()
	}
}
