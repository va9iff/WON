const WONU = "http://127.0.0.1:5000/" //export


async function browse(path="tmp") {
  try {
    const response = await axios.get(`${WONU}/browse/${path}`);
    return response
  } catch (error) {
    console.error(error);
  }
}

async function save(file, name, folder="tmp") {
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
