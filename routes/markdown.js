const express = require("express");
const fs = require("fs");
const verifyToken = require("../middlewares/authJWT");
const PDFDocument = require("pdfkit");
const { markdown } = require("markdown");
const render = require("../helpers/markdownParser");

const router = express.Router();

router.post("/markdown/export", verifyToken, function (req, res) {
  const { text, format } = req.body;
  if (!text || !format) {
    return res.status(400).json({ error: "Text and format are required." });
  }

  if (!["pdf", "txt", "json"].includes(format)) {
    return res
      .status(400)
      .json({ error: "Invalid format. Supported formats: pdf, txt, word." });
  }

  switch (format) {
    case "pdf":
      const pdfDoc = new PDFDocument({ bufferPages: true });
      let buffers = [];

      pdfDoc.on("data", buffers.push.bind(buffers));
      pdfDoc.on("end", () => {
        let pdfData = Buffer.concat(buffers);
        res
          .writeHead(200, {
            "Content-Length": Buffer.byteLength(pdfData),
            "Content-Type": "application/pdf",
            "Content-disposition": "attachment;filename=test.pdf",
          })
          .end(pdfData);
      });

      // pdfDoc.font("./fonts/Quicksand-Regular.ttf").fontSize(14).text(parsedMd);
      render(pdfDoc, text);
      pdfDoc.end();
      // res.download(pdfDoc, "exported-document.pdf", () => {
      //   fs.unlinkSync(pdfPath);
      // });
      break;
    case "txt":
      const txtPath = "exported-document.txt";
      fs.writeFileSync(txtPath, text);
      res.download(txtPath, "exported-document.txt", () => {
        fs.unlinkSync(txtPath);
      });
      break;
  }
});

function markdownToPdfElements(doc, markdownText) {
  const parsedMd = markdown.parse(markdownText);
  for (let i = 1; i < parsedMd.length; i++) {
    const element = parsedMd[i];
    console.log(element);
    doc.font("./fonts/Quicksand-Bold.ttf");
    switch (element[0]) {
      case "header":
        switch (element[1].level) {
          case 1:
            doc.fontSize(24).text(element[2]);
            break;
          case 2:
            doc.fontSize(20).text(element[2]);
            break;
          case 3:
            doc.fontSize(18).text(element[2]);
            break;
          case 4:
            doc.fontSize(16).text(element[2]);
            break;
          case 5:
            doc.fontSize(14).text(element[2]);
            break;
          case 6:
            doc.fontSize(12).text(element[2]);
            break;
        }
        break;
      case "link":
        doc.fontSize(14).text(element[2]);
        break;
    }
  }
}

module.exports = router;
