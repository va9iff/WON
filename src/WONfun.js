import {launch} from "./appsController.js"

export function require(appName, req){
	let prms = new Promise((res,rej)=>{
		let win = launch("files")

		win.frame.contentWindow.resolve = {}


		win.frame.contentWindow.resolve[req] = (arg)=> {
			res(arg)
			win.close()
		}
		win.frame.contentWindow.reject = (arg)=> {
			rej(arg)
			win.close()
		}

		// setTimeout(res("resolved from requireFile promise"),3000)
	})
	return prms
}