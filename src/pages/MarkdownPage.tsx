import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MotionWrapper from "../components/MotionWrapper";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const MarkdownPage = () => {
  const [markdownValue, setMarkdownValue] = useState(
    `# Write down any markdown text here... 
- Add some notes
- like
- this
- ~strikethrough~

#### or [links](https://github.com/olimeme/maitools)
    `
  );

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
            components={ChakraUIRenderer()}
            children={markdownValue}
            skipHtml
          />
        </Box>
      </Flex>
    </MotionWrapper>
  );
};

export default MarkdownPage;
