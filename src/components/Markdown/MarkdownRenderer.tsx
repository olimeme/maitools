import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import ChakraUIRenderer from "../../helpers/chakraUIRenderer";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
// import remarkToc from "remark-toc";

import { Code, Text, useColorMode } from "@chakra-ui/react";

interface MarkdownRendererProps {
  markdownValue: string;
}

const MarkdownRenderer = ({ markdownValue }: MarkdownRendererProps) => {
  const { colorMode } = useColorMode();

  const codeChakraUIElementRenderer: Components = {
    code: ({ inline, children, className }) => {
      if (inline) {
        return (
          <Text
            as="kbd"
            children={children}
            bgColor={colorMode === "light" ? "gray.300" : "whiteAlpha.300"}
            color={colorMode === "light" ? "gray.900" : "whiteAlpha.900"}
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
  };

  return (
    <ReactMarkdown
      remarkPlugins={[
        remarkGfm,
        // remarkToc
      ]}
      rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSanitize]}
      components={ChakraUIRenderer(codeChakraUIElementRenderer)}
      children={markdownValue}
    />
  );
};

export default MarkdownRenderer;
