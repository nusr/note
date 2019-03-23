import FileSaver from "file-saver";
export default {
  methods: {
    // 导出 word 文档
    exportDocx() {
      let contentDocument = $.clone(this.$refs.report);
      $(contentDocument)
        .find(".analyze-echarts__select")
        .remove();
      // console.log(contentDocument);
      this.convertImagesToBase64(contentDocument);
      this.convertChartsToBase64(contentDocument);
      let content = `<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>${
        contentDocument.innerHTML
      }</body></html>`;
      let converted = htmlDocx.asBlob(content);
      let docName = this.subjectTitle + "分析报告.docx";
      FileSaver.saveAs(converted, docName);
      let link = this.createDownloadLink(converted, docName);
      this.$refs.downloadArea.innerHTML = "";
      this.$refs.downloadArea.appendChild(link);
    },
    // 转换图片为 base64 (todo: 有可能因跨域报错)
    convertImagesToBase64(contentDocument) {
      let imgList = contentDocument.querySelectorAll("img");
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      imgList.forEach((img, i) => {
        if (img.src.startsWith("data:image")) return;
        let realWidth = parseInt(img.style.width);
        let realHeight = parseInt(img.style.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = realWidth;
        canvas.height = realHeight;
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          realWidth,
          realHeight
        );
        let dataURL = canvas.toDataURL();
        img.setAttribute("src", dataURL);
      });
      canvas.remove();
    },
    convertChartsToBase64(contentDocument) {
      let canvases = contentDocument.querySelectorAll("canvas"),
        imgRadio = 0.86;
      canvases.forEach((canvas, i) => {
        let chart, chartDom;
        chartDom = this.$refs.mainChart[i];
        chart = chartDom.$refs.chart;
        let url = chart.getDataURL(),
          img = document.createElement("img");
        img.src = url;
        canvas.parentNode.replaceChild(img, canvas);
      });
    },
    createDownloadLink(fileObj, fileName) {
      // console.log(fileObj, fileName);
      let link = document.createElement("a");
      link.href = URL.createObjectURL(fileObj);
      link.download = fileName || "document.docx";
      link.appendChild(document.createTextNode("如果没有自动下载，请点击这里"));
      return link;
    }
  }
};
