// const WONU = "http://127.0.0.1:5000/" //export
// const WONU = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search
const WONU = window.location.href

window.repo = "WON"
window.user = "va9iff"
const url  = `https://api.github.com/repos/${user}/${repo}/contents/`



async function browse(path="tmp") {
  try {
    const response = await fetch(`http://localhost:5000/browse/${path}`);
    try{
      const jsoned = await response.json();
      return jsoned
    }
    catch(err){
      return response
    }
    console.log(jsoned)

    // console.log(response)
  } catch (error) {
    console.error(error);
  }
}

async function save(file, name, folder="") {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("name", name)
  formData.append("folder", folder)
  try {
    const res = await axios.post("http://localhost:5000/save", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function browseOnGitHub(path = "") {
  path = path.replace('>',"/")
  let response = await fetch(`${url}${path}`)
  let k = await response.clone()
  k = await k.json()
  // make directory with k[n].name
  if (k.download_url) {
    // git doesn't provides the mime type, 
    // so we implicityly download again from url.
    // this way gives only the file, so mime is right.
    k.file = await fetch(k.download_url)
    k.file = await k.file.blob()
    // console.log("file",k)
    return k
  }
  k.directory = k.map(p=>p.name)
  // console.log("dir",k)
  return k
}


async function LTbrowseOnGitHub(path = ""){
  path = path.replace(">","/")
  let res = await browseOnGitHub(path)
  return res
}

browse = browseOnGitHub