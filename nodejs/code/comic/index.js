// 配合 https://github.com/kanasimi/work_crawler.git 使用
const compressing = require("compressing")
const fs = require("fs")
const path = require("path")
const unzip = require("unzip")
let startPath = "./yirenzhixia"
let dist = "./dist"
function generateDirectory(dirPath) {
  try {
    if (dirPath && !fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }
  } catch (err) {
    console.log(err)
  }
}
async function unzipFiles(dir_path) {
  generateDirectory(dist)
  let list = fs.readdirSync(dir_path)
  for (let item of list) {
    let filePath = dir_path + "/" + item
    let extname = path.extname(filePath)
    if (extname !== ".zip") {
      continue
    }
    await fs.createReadStream(filePath).pipe(unzip.Extract({ path: dist }))
    console.log("unzip: " + filePath)
  }
  reRange(dir_path)
}
function reRange(dirPath) {
  let resultPath = dirPath + "result"
  generateDirectory(resultPath)
  let list = fs.readdirSync(dist)
  let count = 1
  let maxLen = 4
  for (let item of list) {
    let subDir = dist + "/" + item
    let subFiles = fs.readdirSync(subDir)
    for (let temp of subFiles) {
      let source = subDir + "/" + temp
      let newPath =
        resultPath +
        "/" +
        "0".repeat(maxLen - count.toString().length) +
        count +
        path.extname(temp)
      console.log("copy: " + newPath)
      fs.copyFileSync(source, newPath)
      fs.unlinkSync(source)
      count++
    }
    fs.rmdirSync(subDir)
  }
  fs.rmdirSync(dist)
}
function rename(dirPath, newDir) {
  let list = fs.readdirSync(dirPath)
  let count = 1
  let maxLen = 4
  generateDirectory(newDir)
  for (let item of list) {
    let oldPath = dirPath + "/" + item
    let newPath =
      newDir +
      "/" +
      "0".repeat(maxLen - count.toString().length) +
      count +
      path.extname(item)
    console.log("rename: " + newPath)
    count++
    fs.copyFileSync(oldPath, newPath)
    fs.unlinkSync(oldPath)
  }
  fs.rmdirSync(dirPath)
}
;(async () => {
  // await unzipFiles(startPath)
  reRange(startPath)
})()
