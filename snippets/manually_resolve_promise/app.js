const log = console.log

// requireFile is a function
let requireFile =
    // that will return a promise
    () =>
        new Promise(
            // res is .then(res) rej is .catch(rej)
            (res, rej) =>
                // it will resolve after 800 seconds
                {
                    // we return for resolve with res
                    let btn = document.createElement("button")
                    document.body.appendChild(btn)
                    btn.innerHTML = "select"
                    btn.onclick = () => {
                        res("<the file>")
                        btn.remove()
                    }
                }
        )

async function functionality() {
    // this is the function of app
    // lets say it wants a file to process
    // he would require the file like
    const given_file = await requireFile()

    // and do something here
    console.log("do functionality with", given_file)

    // const given_file = await requireFile() will ask user to select a file.
    // as it will return a promis, the code will stop here
    // the promise will not be resolved until user selects a file.
    // (until clicks the button here.)
}

functionality()
