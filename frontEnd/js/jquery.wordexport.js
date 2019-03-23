/* jshint laxbreak: true */
/* jshint maxcomplexity:17 */
/* global define */

'use strict'
// UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.
// https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
;(function (factory, jQuery, saveAs) {
  if (typeof exports === 'object') {
    module.exports = factory(jQuery, saveAs)
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery', 'file-saver'], factory)
  } else {
    factory(jQuery, saveAs)
  }
})(
  function ($, saveAs) {
    if (typeof $ !== 'undefined' && typeof saveAs !== 'undefined') {
      // options = {
      //     style:'',
      //     maxWidth: 624
      // }
      $.fn.wordExport = function (fileName, options) {
        options = options || {}
        var maxWidth = options.maxWidth || 624
        var wordStyle = options.style || ''
        fileName = fileName || 'jQuery-Word-Export'
        var wordConfig = {
          top:
            'Mime-Version: 1.0\nContent-Base: ' +
            location.href +
            '\nContent-Type: Multipart/related; boundary="NEXT.ITEM-BOUNDARY";type="text/html"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset="utf-8"\nContent-Location: ' +
            location.href +
            '\n\n<!DOCTYPE html>\n<html>\n_html_</html>',
          head:
            '<head>\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n<style>\n_styles_\n</style>\n</head>\n',
          body: '<body>_body_</body>'
        }
        var markup = $(this).clone(true, true) // 在jquery中fn的this指代获取的jquery对象
        //  去掉被隐藏的元素
        markup.each(function () {
          var self = $(this)
          if (self.is(':hidden')) self.remove()
        })
        var item
        var canvases = markup.find('canvas')
        // canvas 转换为 img
        for (var j = 0; j < canvases.length; j++) {
          var width = canvases[j].width
          var height = canvases[j].height
          var str = 'width:' + width + 'px; height:' + height + 'px;'
          str += canvases.eq(j).attr('style')
          var imgData = canvases[j].toDataURL()
          var canvas2img = document.createElement('img')
          canvas2img.setAttribute('src', imgData)
          canvas2img.style = str
          canvas2img.className = 'myCanvas' + j
          canvas2img.onload = function () {
            open(imgData)
            var replaceObj = $(this)
            var obj = markup.find('canvas').eq(j)
            obj.replaceWith(replaceObj)
          }
        }
        var images = []
        var imgList = markup.find('img')
        // img 转换为 base64
        for (var k = 0; k < imgList.length; k++) {
          item = imgList[k]
          // Calculate dimensions of output image
          var itemWidth = Math.min(item.width, maxWidth) // 获取图片的宽度
          var itemHeight = item.height * (itemWidth / item.width) // 计算图片的高度
          // Create canvas for converting image to data URL
          var canvas = document.createElement('CANVAS')
          canvas.width = itemWidth
          canvas.height = itemHeight
          // Draw image to canvas
          var context = canvas.getContext('2d')
          context.drawImage(item, 0, 0, itemWidth, itemHeight)
          // Get data URL encoding of image
          var uri = canvas.toDataURL()
          $(item).attr('src', item.src)
          item.width = itemWidth
          item.height = itemHeight
          // Save encoded image to array
          images.push({
            type: uri.substring(uri.indexOf(':') + 1, uri.indexOf(';')),
            encoding: uri.substring(uri.indexOf(';') + 1, uri.indexOf(',')),
            location: $(item).attr('src'),
            data: uri.substring(uri.indexOf(',') + 1)
          })
        }

        // Prepare bottom of html file with image data
        var htmlBottom = '\n'
        for (var i = 0; i < images.length; i++) {
          item = images[i]
          htmlBottom +=
            '--NEXT.ITEM-BOUNDARY\n' +
            'Content-Location: ' +
            item.location +
            '\n' +
            'Content-Type: ' +
            item.type +
            '\n' +
            'Content-Transfer-Encoding: ' +
            item.encoding +
            '\n\n' +
            item.data +
            '\n\n'
        }
        htmlBottom += '--NEXT.ITEM-BOUNDARY--'
        var fileContent =
          wordConfig.top.replace(
            '_html_',
            wordConfig.head.replace('_styles_', wordStyle || '') +
              wordConfig.body.replace('_body_', markup.html())
          ) + htmlBottom
        var blob = new Blob([fileContent], {
          type: 'application/msword;charset=utf-8'
        })
        saveAs(blob, fileName + '.doc')
      }
    } else {
      if (typeof $ === 'undefined') {
        console.error('jQuery Word Export: missing dependency (jquery)')
      }
      if (typeof saveAs === 'undefined') {
        console.error('jQuery Word Export: missing dependency (file-saver)')
      }
    }
  },
  window.jQuery || window.$,
  window.saveAs
)
