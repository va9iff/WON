import {launch} from "./appsController.js"

export function requireFile(){
	launch("files")
	let prms = new Promise((res,rej)=>{
		setTimeout(res("resolved from requireFile promise"),3000)
	})
	return prms
}