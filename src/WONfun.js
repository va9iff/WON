import {launch} from "./appsController.js"

export function requireFile(){
	let prms = new Promise((res,rej)=>{
		let win = launch("requireFile")
		win.frame.contentWindow.resolve = (arg)=> {
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