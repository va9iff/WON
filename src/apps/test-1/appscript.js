let desktop = self.TOP.parentElement.getBoundingClientRect()

while (self.app.windows.length < 20){
	let win = new self.constructor(self.app,self.app.home)
	win.position = 
	[
	desktop.width * Math.random(),
	desktop.height * Math.random()
	]
	setTimeout(()=>win.minimize(), Math.random()*self.app.windows.length*70+1200)

}

