let a = {
		name: 'anonymous'
	}
	// dynamically loading new apps, BUT they consume namespace in APPS
	loadApp(a)
	new Window(a).makeWindowElement(70,90)

	new desktopIcon(a).add()