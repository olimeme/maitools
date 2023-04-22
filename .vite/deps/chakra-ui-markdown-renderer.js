import {
  Checkbox,
  Code,
  Divider,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList
} from "./chunk-N7XUUZQK.js";
import {
  chakra,
  require_jsx_runtime
} from "./chunk-MYSK4KJE.js";
import "./chunk-XYLSUGT6.js";
import "./chunk-FLAVOKRJ.js";
import {
  __commonJS,
  __toESM
} from "./chunk-AC2VUBZ6.js";

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge;
    module.exports = deepmerge_1;
  }
});

// node_modules/chakra-ui-markdown-renderer/dist/index.esm.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_deepmerge = __toESM(require_cjs());
var y = function() {
  return (y = Object.assign || function(e2) {
    for (var r2, i = 1, n = arguments.length; i < n; i++)
      for (var t in r2 = arguments[i])
        Object.prototype.hasOwnProperty.call(r2, t) && (e2[t] = r2[t]);
    return e2;
  }).apply(this, arguments);
};
function k(e2) {
  return e2["data-sourcepos"] ? { "data-sourcepos": e2["data-sourcepos"] } : {};
}
var x = { p: function(r2) {
  var n = r2.children;
  return (0, import_jsx_runtime.jsx)(Text, y({ mb: 2 }, { children: n }), void 0);
}, em: function(r2) {
  var n = r2.children;
  return (0, import_jsx_runtime.jsx)(Text, y({ as: "em" }, { children: n }), void 0);
}, blockquote: function(r2) {
  var i = r2.children;
  return (0, import_jsx_runtime.jsx)(Code, y({ as: "blockquote", p: 2 }, { children: i }), void 0);
}, code: function(r2) {
  var i = r2.inline, t = r2.children, c = r2.className;
  return (0, import_jsx_runtime.jsx)(Code, i ? { p: 2, children: t } : { className: c, whiteSpace: "break-spaces", display: "block", w: "full", p: 2, children: t }, void 0);
}, del: function(r2) {
  var n = r2.children;
  return (0, import_jsx_runtime.jsx)(Text, y({ as: "del" }, { children: n }), void 0);
}, hr: function(r2) {
  return (0, import_jsx_runtime.jsx)(Divider, {}, void 0);
}, a: Link, img: Image, text: function(r2) {
  var n = r2.children;
  return (0, import_jsx_runtime.jsx)(Text, y({ as: "span" }, { children: n }), void 0);
}, ul: function(r2) {
  var i = r2.ordered, n = r2.children, t = r2.depth, c = k(r2), d = UnorderedList, l = "disc";
  return i && (d = OrderedList, l = "decimal"), 1 === t && (l = "circle"), (0, import_jsx_runtime.jsx)(d, y({ spacing: 2, as: i ? "ol" : "ul", styleType: l, pl: 4 }, c, { children: n }), void 0);
}, ol: function(r2) {
  var i = r2.ordered, n = r2.children, t = r2.depth, c = k(r2), d = UnorderedList, l = "disc";
  return i && (d = OrderedList, l = "decimal"), 1 === t && (l = "circle"), (0, import_jsx_runtime.jsx)(d, y({ spacing: 2, as: i ? "ol" : "ul", styleType: l, pl: 4 }, c, { children: n }), void 0);
}, li: function(r2) {
  var i = r2.children, n = r2.checked, t = null;
  return null != n && (t = (0, import_jsx_runtime.jsx)(Checkbox, y({ isChecked: n, isReadOnly: true }, { children: i }), void 0)), (0, import_jsx_runtime.jsx)(ListItem, y({}, k(r2), { listStyleType: null !== n ? "none" : "inherit" }, { children: t || i }), void 0);
}, heading: function(r2) {
  var i = r2.level, n = r2.children;
  return (0, import_jsx_runtime.jsx)(Heading, y({ my: 4, as: "h".concat(i), size: ["2xl", "xl", "lg", "md", "sm", "xs"]["".concat(i - 1)] }, k(r2), { children: n }), void 0);
}, pre: function(r2) {
  var i = r2.children;
  return (0, import_jsx_runtime.jsx)(chakra.pre, y({}, k(r2), { children: i }), void 0);
}, table: Table, thead: Thead, tbody: Tbody, tr: function(r2) {
  return (0, import_jsx_runtime.jsx)(Tr, { children: r2.children }, void 0);
}, td: function(r2) {
  return (0, import_jsx_runtime.jsx)(Td, { children: r2.children }, void 0);
}, th: function(r2) {
  return (0, import_jsx_runtime.jsx)(Th, { children: r2.children }, void 0);
} };
function q(e2, i) {
  void 0 === i && (i = true);
  var n = { p: x.p, em: x.em, blockquote: x.blockquote, code: x.code, del: x.del, hr: x.hr, a: x.a, img: x.img, text: x.text, ul: x.ul, ol: x.ol, li: x.li, h1: x.heading, h2: x.heading, h3: x.heading, h4: x.heading, h5: x.heading, h6: x.heading, pre: x.pre, table: x.table, thead: x.thead, tbody: x.tbody, tr: x.tr, td: x.td, th: x.th };
  return e2 && i ? (0, import_deepmerge.default)(n, e2) : n;
}
export {
  q as default,
  x as defaults
};
/*! Bundled license information:

chakra-ui-markdown-renderer/dist/index.esm.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=chakra-ui-markdown-renderer.js.map
