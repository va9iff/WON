import {launch} from "./appsController.js"

// when requiring
/*
await require(appName :string, requestType :string) //it returns a Promise
*/

// when resolving
/*
if (resolve.requestType) resolve.requestType(argToRequestedApp)
*/

function resolver(win,arg,resFun){
	resFun(arg)
	win.close()
}

export function require(appName, req){
	let prms = new Promise((res,rej)=>{
		let win = launch("files")

		// win.frame.contentWindow.resolve = {}


		win.frame.contentWindow.resolve = {}

		win.frame.contentWindow.resolve = (arg)=> {
			resolver(win,arg,res)
		}

		win.frame.contentWindow.resolve[req] = true

		win.frame.contentWindow.reject = (arg)=> {
			rej(arg)
			// win.close()
		}
		win.frame.contentWindow.resolve.try = (reqCase,arg)=> {
try{			if(reqCase==req) {
						resolver(win,arg,res)
						return true
					}
		}	
		catch(err){
			rej()
			}
		}

		// setTimeout(res("resolved from requireFile promise"),3000)
	})
	return prms
}