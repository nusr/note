const fs = require("fs")
const path = require("path")
const { exec } = require("child_process")

function deleteJs() {
  let dirPath = __dirname
  let files = fs.readdirSync(dirPath)
  for (let item of files) {
    let filePath = dirPath + "/" + item
    let extname = path.extname(item)
    if (extname === ".js") {
      if (item !== "index.js") {
        fs.unlinkSync(filePath)
      }
    } else {
      /*  exec(`tsc ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`????: ${error}`)
          return
        }
      }) */
    }
  }
}
deleteJs()
