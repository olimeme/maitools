import * as React from "react";
import deepmerge from "deepmerge";
import { Components } from "react-markdown";
import {
  Code,
  Divider,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Checkbox } from "@chakra-ui/checkbox";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { chakra } from "@chakra-ui/system";
import {
  DARK_MODE_CODE_BG_COLOR,
  LIGHT_MODE_CODE_BG_COLOR,
} from "../themes/colors";
import { Button } from "@chakra-ui/react";

type GetCoreProps = {
  children?: React.ReactNode;
  "data-sourcepos"?: any;
};

function getCoreProps(props: GetCoreProps): any {
  return props["data-sourcepos"]
    ? { "data-sourcepos": props["data-sourcepos"] }
    : {};
}

function convertTextToHeadingId(text: string) {
  let filteredString = text.split(" ").join("-").toLowerCase();
  let forbiddenChars = ["/", "?", "&", "=", ".", '"', "'", ")", "("];

  for (let char of forbiddenChars) {
    filteredString = filteredString.split(char).join("");
  }
  return filteredString;
}

interface Defaults extends Components {
  /**
   * @deprecated Use `h1, h2, h3, h4, h5, h6` instead.
   */
  heading?: Components["h1"];
}

export const defaults: Defaults = {
  p: (props) => {
    const { children } = props;
    return <Text mb={2}>{children}</Text>;
  },
  em: (props) => {
    const { children } = props;
    return <Text as="em">{children}</Text>;
  },
  blockquote: (props) => {
    const { children } = props;
    return (
      <Text as="b">
        <Text as="cite">{children}</Text>
      </Text>
    );
  },
  code: (props) => {
    const { inline, children, className } = props;

    if (inline) {
      return (
        <Text
          as="kbd"
          children={children}
          bgColor={"gray.200"}
          color={"gray.900"}
        />
      );
    }

    return (
      <Code
        className={className}
        whiteSpace="break-spaces"
        display="block"
        w="full"
        children={children}
      />
    );
  },
  del: (props) => {
    const { children } = props;
    return <Text as="del">{children}</Text>;
  },
  hr: (props) => {
    return <Divider />;
  },
  a: Link,
  img: Image,
  text: (props) => {
    const { children } = props;
    return <Link href={`#${children}`}>{children}</Link>;
  },
  ul: (props) => {
    const { ordered, children, depth } = props;
    const attrs = getCoreProps(props);
    let Element = UnorderedList;
    let styleType = "disc";
    if (ordered) {
      Element = OrderedList;
      styleType = "decimal";
    }
    if (depth === 1) styleType = "circle";
    return (
      <Element
        spacing={2}
        as={ordered ? "ol" : "ul"}
        styleType={styleType}
        pl={4}
        {...attrs}
      >
        {children}
      </Element>
    );
  },
  ol: (props) => {
    const { ordered, children, depth } = props;
    const attrs = getCoreProps(props);
    let Element = UnorderedList;
    let styleType = "disc";
    if (ordered) {
      Element = OrderedList;
      styleType = "decimal";
    }
    if (depth === 1) styleType = "circle";
    return (
      <Element
        spacing={2}
        as={ordered ? "ol" : "ul"}
        styleType={styleType}
        pl={4}
        {...attrs}
      >
        {children}
      </Element>
    );
  },
  li: (props) => {
    const { children, checked } = props;
    let checkbox = null;
    if (checked !== null && checked !== undefined) {
      checkbox = (
        <Checkbox isChecked={checked} isReadOnly>
          {children}
        </Checkbox>
      );
    }
    return (
      <ListItem
        {...getCoreProps(props)}
        listStyleType={checked !== null ? "none" : "inherit"}
      >
        {checkbox || children}
      </ListItem>
    );
  },
  heading: (props) => {
    const { level, children } = props;
    const sizes = ["2xl", "xl", "lg", "md", "sm", "xs"];
    console.log(children);
    return (
      <>
        <Heading
          my={4}
          id={`${convertTextToHeadingId(children.toString())}`}
          as={`h${level}`}
          size={sizes[`${level - 1}`]}
          {...getCoreProps(props)}
        >
          {children}
        </Heading>
        <Divider mb={4} />
      </>
    );
  },
  pre: (props) => {
    const { children } = props;
    return <chakra.pre {...getCoreProps(props)}>{children}</chakra.pre>;
  },
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: (props) => <Tr>{props.children}</Tr>,
  td: (props) => <Td>{props.children}</Td>,
  th: (props) => <Th>{props.children}</Th>,
};

function ChakraUIRenderer(theme?: Defaults, merge = true): Components {
  const elements = {
    p: defaults.p,
    em: defaults.em,
    blockquote: defaults.blockquote,
    code: defaults.code,
    del: defaults.del,
    hr: defaults.hr,
    a: defaults.a,
    img: defaults.img,
    text: defaults.text,
    ul: defaults.ul,
    ol: defaults.ol,
    li: defaults.li,
    h1: defaults.heading,
    h2: defaults.heading,
    h3: defaults.heading,
    h4: defaults.heading,
    h5: defaults.heading,
    h6: defaults.heading,
    pre: defaults.pre,
    table: defaults.table,
    thead: defaults.thead,
    tbody: defaults.tbody,
    tr: defaults.tr,
    td: defaults.td,
    th: defaults.th,
  };

  if (theme && merge) {
    return deepmerge(elements, theme);
  }

  return elements;
}

export default ChakraUIRenderer;
