let desktop = self.TOP.parentElement.getBoundingClientRect()

while (self.app.testwins.length < 30){
	let win = WON.launchManual(WON.loadApp({
		...self.app,
		name: "test-2:"+parseInt(Math.random()*100000000)
	}))
	win.position = 
	[
	desktop.width * Math.random(),
	desktop.height * Math.random()
	]
	setTimeout(()=>win.minimize(), Math.random()*self.app.windows.length*70+1200)
	self.app.testwins.push(win)
	// console.log(self.app.testwins)

}