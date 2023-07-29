import { useEffect, useState } from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Box, Flex, Heading, Textarea } from "@chakra-ui/react";
import MarkdownRenderer from "../components/Markdown/MarkdownRenderer";
import { markdownPageInitialValue } from "../helpers/markdownPageInitialValue";
import { getInitialStateFromLocalStorage } from "../helpers/getInitialStateFromLocalStorage";
import BackButton from "../components/BackButton";
import { AutoResizeTextarea } from "../components/Markdown/AutoResizeTextarea";

const MarkdownPage = () => {
  const [markdownValue, setMarkdownValue] = useState(
    () =>
      getInitialStateFromLocalStorage(
        "markdownValue",
        markdownPageInitialValue
      ) as string
  );

  useEffect(() => {
    localStorage.setItem("markdownValue", JSON.stringify(markdownValue));
  }, [markdownValue]);

  const handleInputChange:
    | React.ChangeEventHandler<HTMLTextAreaElement>
    | undefined = (e) => {
    let inputValue = e.target.value;
    setMarkdownValue(inputValue);
  };

  return (
    <MotionWrapper>
      <Flex wrap={"wrap"} mx={4}>
        <Box flex={1}>
          <AutoResizeTextarea
            value={markdownValue}
            onChange={handleInputChange}
            placeholder="Write any markdown text here..."
          />
        </Box>
        <Box flex={1} px={4}>
          <MarkdownRenderer markdownValue={markdownValue} />
        </Box>
      </Flex>
    </MotionWrapper>
  );
};

export default MarkdownPage;
