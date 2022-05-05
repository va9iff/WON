let desktop = self.TOP.parentElement.getBoundingClientRect()

while (self.app.windows.length < 10){
	let win = new self.constructor(self.app,self.app.home)
	win.position = 
	[
	desktop.width * Math.random(),
	desktop.height * Math.random()
	]

}

