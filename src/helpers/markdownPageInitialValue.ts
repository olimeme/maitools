export const markdownPageInitialValue = `# A demo of ${`react-markdown`}

${`react-markdown`} is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using ${`dangerouslySetInnerHTML`}
* Lets you define your own components (to render ${`MyHeading`} instead of ${`h1`})
* Has a lot of plugins

## Table of contents

Here is an example of a plugin in action
([${`remark-toc`}](https://github.com/remarkjs/remark-toc)).
This section is replaced by an actual table of contents.

## Syntax highlighting

Here is an example of a plugin to highlight code:
[${`rehype-highlight`}](https://github.com/rehypejs/rehype-highlight).

## GitHub flavored markdown (GFM)

For GFM, you can *also* use a plugin:
[${`remark-gfm`}](https://github.com/remarkjs/react-markdown#use).
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.

| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ ${`remark-gfm`} |

~~strikethrough~~

* [ ] task list
* [x] checked item

https://example.com

## HTML in markdown

<blockquote>
  👆 Use the toggle above to add the plugin.
</blockquote>

## Components

You can pass components to change things:

## More info?

Much more info is available in the
[readme on GitHub](https://github.com/remarkjs/react-markdown)!

***

A component by [Espen Hovlandsdal](https://espen.codes/)`;
