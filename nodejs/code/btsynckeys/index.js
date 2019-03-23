/**
 * @overview
 * @author Steve Xu <stevexugc@gmail.com>
 * @copyright Copyright (c) 2018, Steve Xu
 * @license MIT
 * @preserve
 */
// 请求
const COMMON_CONFIG = {
  baseUrl: "https://www.btsynckeys.com",
  result: "result",
  errorJSON: "error.json",
  resultJSON: "result.json",
  encode: "utf-8"
}
const requestLib = require("request")
const jar = requestLib.jar()
const request = requestLib.defaults({
  jar: jar,
  baseUrl: COMMON_CONFIG.baseUrl,
  headers: {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "max-age=0",
    Connection: "keep-alive",
    Host: "www.btsynckeys.com",
    "Upgrade-Insecure-Requests": 1,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36"
  }
})
// 解析 dom
const cheerio = require("cheerio")
const fs = require("fs")
const log = (info, tag) => {
  console.log(info)
}
/**
 * 基础类
 * 编写其他类使用的公共方法
 */
class BaseSpider {
  constructor(startPage) {
    this.startPage = startPage || 16
    this.endPage = this.startPage
    this.errorPage = []
    this.tableList = this.readJsonFile(COMMON_CONFIG.resultJSON) || {}
	this.generateDirectory(COMMON_CONFIG.result)
  }
  readResult() {
    let dirName = COMMON_CONFIG.result
    let list = fs.readdirSync(dirName)
    for (let item of list) {
      let filePath = dirName + "/" + item
      log(filePath)
      let $ = cheerio.load(fs.readFileSync(filePath, COMMON_CONFIG.encode))
      this.parseHtml($)
    }
  }
  async getCookie() {
    await this.requestPage("/10")
    jar.getCookies(COMMON_CONFIG.baseUrl)
    for (let i = this.startPage; i <= this.endPage; i++) {
      let url = "/" + i + "0"
      let filePath = COMMON_CONFIG.result + "/" + i + ".html"
      log(url)
      await request.get(url).pipe(fs.createWriteStream(filePath))
    }
	this.readResult()
  }
  requestPage(requestUrl) {
    let self = this
    try {
      return new Promise((resolve, reject) => {
        request.get(requestUrl, function(err, response, body) {
          let $ = cheerio.load(body)
          self.parseHtml($)
          resolve($)
        })
      })
    } catch (error) {
      this.errorPage.push(requestUrl)
      this.updateJsonFile(this.errorPage, COMMON_CONFIG.errorJSON)
    }
  }
  parseHtml($) {
    let tableList = this.tableList
    $(".table.table-striped.table-responsive tr").each(function() {
      let dom = $(this)
        .find("a")
        .first()
      let link = dom.attr("href")
      let title = dom.text().trim()
      if (link && title) {
        tableList[link] = {
          link,
          title: title.trim()
        }
      }
    })
    this.updateJsonFile(tableList, COMMON_CONFIG.resultJSON)
  }
  /**
   * 下载文件
   * @param {String} url 请求链接
   * @param {String} filePath 文件路径
   */
  downloadFile(url, filePath) {
    // 防止一个请求出错，导致程序终止
    try {
      request
        .get(url)
        .on("error", (err) => {
          if (err) {
            console.log(err)
          }
          return
        })
        .pipe(fs.createWriteStream(filePath))
    } catch (error) {
      log(error)
      this.errorPage.push(this.startPage)
      this.updateJsonFile(this.errorPage, "errorPage.json")
    }
  }
  /**
   * 更新 json 文件
   * @param {Object,Array} data 要更新的 json 数据
   * @param {String} filePath 文件路径
   */
  updateJsonFile(data, filePath, bool = true) {
    let jsonData = ""
    if (bool) {
      jsonData = JSON.stringify(data, null, 2)
    } else {
      jsonData = JSON.stringify(data)
    }
    fs.writeFile(filePath, jsonData, (err) => {
      log(err, false)
    })
  }
  /**
   * 读取 json 文件
   * @param {String} filePath 文件路径
   */
  readJsonFile(filePath) {
    try {
      let data = fs.readFileSync(filePath)
      data = data ? JSON.parse(data) : null
      return data
    } catch (error) {
      log(error, false)
    }
  }
  /**
   *生成目录
   * @param {String} dirPath 目录路径
   */
  generateDirectory(dirPath) {
    try {
      if (dirPath && !fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath)
      }
    } catch (err) {
      console.log(err)
    }
  }
  /**
   * 去掉文件路径中的空白
   * @param {String} filePath
   */
  filterIllegalPath(filePath) {
    let result = filePath.replace(/[^\da-z\u4e00-\u9fa5]/gi, "")
    return result
  }
}
let spider = new BaseSpider()
spider.getCookie()
