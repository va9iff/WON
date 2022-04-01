export let start = {
	menu: document.querySelector("#startMenu"),
	button: document.querySelector("#startButton"),
	isOpened: false,
	open(argument) {
		this.menu.classList.add("opened")
	},
	close() {
		this.menu.classList.remove("opened")
	},
	leavingTimeoutId: null,
	enter(){
		if(start.leavingTimeoutId) clearTimeout(start.leavingTimeoutId)
	},
	leave(){
		if (start.leavingTimeoutId) clearTimeout(start.leavingTimeoutId)
		start.leavingTimeoutId = setTimeout(() => {
			start.isOpened = false
			start.close()
		}, 300)
	}

}

start.button.onmouseenter = start.enter
start.menu.onmouseenter = start.enter

start.button.onmouseleave = start.leave
start.menu.onmouseleave = start.leave

start.button.onclick = () => {
	if (!start.isOpened) {
		start.isOpened = true
		return start.open()
	}
	// disable closing by clicking, so it have to hover out to close
	return
	start.close()
	start.isOpened = false
}


start.menu.querySelector("#powerButton").onclick = ()=> {
	document.querySelector("#main").style.transitionDuration = "600ms"
	// document.querySelector("#main").style.transform = "scale(0.4)"
	document.querySelector("#main").style.opacity = 0.0
		document.exitFullscreen()
	setTimeout(() => {
		document.querySelector("#main").remove()
		alert("WONOS have been terminated. \nRefresh is required to run again.")
		document.body.innerHTML = ""
	}, 700);
}

start.menu.querySelector("#fullScreen").onclick = ()=> document.querySelector("#main").requestFullscreen()
start.menu.querySelector("#restart").onclick = () => location.reload(true)