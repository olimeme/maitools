import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import MotionWrapper from "../components/MotionWrapper";
import {
  Box,
  Code,
  Flex,
  Heading,
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import ChakraUIRenderer from "../helpers/chakraUIRenderer";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";

const MarkdownPage = () => {
  const [markdownValue, setMarkdownValue] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  const handleInputChange:
    | React.ChangeEventHandler<HTMLTextAreaElement>
    | undefined = (e) => {
    let inputValue = e.target.value;
    setMarkdownValue(inputValue);
  };

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
    <MotionWrapper>
      <Heading mb={8} textAlign={"center"}>
        Markdown
      </Heading>
      <Flex>
        <Box flex={1}>
          <Textarea
            minHeight={"100vh"}
            variant={"filled"}
            value={markdownValue}
            onChange={handleInputChange}
            placeholder="Write any markdown text here..."
            size={"lg"}
          />
        </Box>
        <Box flex={1} px={8}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSanitize]}
            components={ChakraUIRenderer(codeChakraUIElementRenderer)}
            children={markdownValue}
          />
        </Box>
      </Flex>
    </MotionWrapper>
  );
};

export default MarkdownPage;
