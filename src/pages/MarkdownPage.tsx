import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MotionWrapper from "../components/MotionWrapper";
import { Box, Flex, Heading, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import ChakraUIRenderer from "../helpers/chakraUIRenderer";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

const MarkdownPage = () => {
  const [markdownValue, setMarkdownValue] = useState("");

  const handleInputChange:
    | React.ChangeEventHandler<HTMLTextAreaElement>
    | undefined = (e) => {
    let inputValue = e.target.value;
    setMarkdownValue(inputValue);
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
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={ChakraUIRenderer()}
            children={markdownValue}
          />
        </Box>
      </Flex>
    </MotionWrapper>
  );
};

export default MarkdownPage;
