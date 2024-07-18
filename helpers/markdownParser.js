const fs = require("fs");
const vm = require("vm");
const { markdown } = require("markdown");
// const CodeMirror = require("codemirror/addon/runmode/runmode.node");

process.chdir(__dirname);

// setup code mirror javascript mode
// const filename = require.resolve("codemirror/mode/javascript/javascript");
// const jsMode = fs.readFileSync(filename, "utf8");
// vm.runInNewContext(jsMode, { CodeMirror });

// style definitions for markdown
const styles = {
  h1: {
    font: "../fonts/Quicksand-Bold.ttf",
    fontSize: 36,
    padding: 10,
  },
  h2: {
    font: "../fonts/Quicksand-Bold.ttf",
    fontSize: 30,
    padding: 10,
  },
  h3: {
    font: "../fonts/Quicksand-Bold.ttf",
    fontSize: 24,
    padding: 10,
  },
  h4: {
    font: "../fonts/Quicksand-Bold.ttf",
    fontSize: 20,
    padding: 10,
  },
  h5: {
    font: "../fonts/Quicksand-Bold.ttf",
    fontSize: 18,
    padding: 10,
  },
  h6: {
    font: "../fonts/Quicksand-Bold.ttf",
    fontSize: 16,
    padding: 10,
  },
  para: {
    font: "../fonts/Quicksand-Bold.ttf",
    fontSize: 10,
  },
  code: {
    font: "../fonts/Quicksand-Bold.ttf",
    fontSize: 9,
  },
  code_block: {
    background: "#2c2c2c",
  },
  inlinecode: {
    font: "../fonts/Quicksand-Bold.ttf",
    fontSize: 10,
  },
  blockquote: {
    font: "../fonts/Quicksand-Bold.ttf",
    fontSize: 10,
    color: "#666",
    padding: 10,
  },
  listitem: {
    font: "../fonts/Quicksand-Bold.ttf",
    fontSize: 10,
  },
  link: {
    font: "../fonts/Quicksand-Bold.ttf",
    color: "blue",
  },
};

// syntax highlighting colors
// based on Github's theme
const colors = {
  keyword: "#cb4b16",
  atom: "#d33682",
  number: "#009999",
  def: "#2aa198",
  variable: "#108888",
  "variable-2": "#b58900",
  "variable-3": "#6c71c4",
  property: "#2aa198",
  operator: "#6c71c4",
  comment: "#999988",
  string: "#dd1144",
  "string-2": "#009926",
  meta: "#768E04",
  qualifier: "#b58900",
  builtin: "#d33682",
  bracket: "#cb4b16",
  tag: "#93a1a1",
  attribute: "#2aa198",
  header: "#586e75",
  quote: "#93a1a1",
  link: "#93a1a1",
  special: "#6c71c4",
  default: "#002b36",
};

let codeBlocks = [];
let lastType = null;

// This class represents a node in the markdown tree, and can render it to pdf
class Node {
  constructor(tree) {
    // special case for text nodes
    if (typeof tree === "string") {
      this.type = "text";
      this.text = tree;
      return;
    }

    this.type = tree.shift();
    this.attrs = {};

    if (typeof tree[0] === "object" && !Array.isArray(tree[0])) {
      this.attrs = tree.shift();
    }

    // parse sub nodes
    this.content = [];
    while (tree.length) {
      this.content.push(new Node(tree.shift()));
    }

    switch (this.type) {
      case "header":
        this.type = `h${this.attrs.level}`;
        break;
      // case "code_block":
      //   // use code mirror to syntax highlight the code block
      //   var code = this.content[0].text;
      //   this.content = [];
      //   CodeMirror.runMode(code, "javascript", (text, style) => {
      //     const color = colors[style] || colors.default;
      //     const opts = {
      //       color,
      //       continued: text !== "\n",
      //     };

      //     return this.content.push(new Node(["code", opts, text]));
      //   });

      //   if (this.content.length) {
      //     this.content[this.content.length - 1].attrs.continued = false;
      //   }
      //   codeBlocks.push(code);
      //   break;

      // case "img":
      //   // images are used to generate inline example output
      //   // stores the JS so it can be run
      //   // in the render method
      //   this.type = "example";
      //   code = codeBlocks[this.attrs.alt];
      //   if (code) {
      //     this.code = code;
      //   }
      //   this.height = +this.attrs.title || 0;
      //   break;
    }

    this.style = styles[this.type] || styles.para;
  }

  // sets the styles on the document for this node
  setStyle(doc) {
    if (this.style.font) {
      doc.font(this.style.font);
    }

    if (this.style.fontSize) {
      doc.fontSize(this.style.fontSize);
    }

    if (this.style.color || this.attrs.color) {
      doc.fillColor(this.style.color || this.attrs.color);
    } else {
      doc.fillColor("black");
    }
    console.log(this);
    const options = {};
    options.align = this.style.align;
    options.link = this.attrs.href || null; // override continued link
    if (this.attrs.continued != null) {
      options.continued = this.attrs.continued;
    }
    return options;
  }

  // renders this node and its subnodes to the document
  render(doc, continued) {
    if (continued == null) {
      continued = false;
    }
    // loop through subnodes and render them
    for (let index = 0; index < this.content.length; index++) {
      const fragment = this.content[index];
      if (fragment.type === "listitem") {
        // add a bullet point
        const options = this.setStyle(doc);
        doc.fontSize(this.style.fontSize).text("• ", {
          continued: true,
          ...options,
        });
      }

      if (fragment.type === "text") {
        // set styles and whether this fragment is continued (for rich text wrapping)
        const options = this.setStyle(doc);

        if (options.continued == null) {
          options.continued = continued || index < this.content.length - 1;
        }

        // remove newlines unless this is code
        if (this.type !== "code") {
          fragment.text = fragment.text.replace(/[\r\n]\s*/g, " ");
        }

        doc.text(fragment.text, options);

        if (
          this.type === "h1" ||
          this.type === "h2" ||
          this.type === "h3" ||
          this.type === "h4" ||
          this.type === "h5" ||
          this.type === "h6"
        ) {
          doc
            .lineWidth(0.5)
            .fillColor("gray")
            .moveTo(72, doc.y + 5)
            .lineTo(542, doc.y + 5)
            .stroke();
        }
      } else {
        fragment.render(
          doc,
          index < this.content.length - 1 && this.type !== "bulletlist"
        );
      }

      lastType = this.type;
    }

    if (this.style.padding) {
      return (doc.y += this.style.padding);
    }
  }
}

// reads and renders a markdown/literate javascript file to the document
const render = (doc, text) => {
  codeBlocks = [];
  const tree = markdown.parse(text);
  tree.shift();
  console.log(tree);

  const result = [];
  while (tree.length) {
    const node = new Node(tree.shift());
    result.push(node.render(doc));
  }
  return result;
};

module.exports = render;
