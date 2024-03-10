import { useEffect, useState } from "react";
import MotionWrapper from "../components/MotionWrapper";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Textarea,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import MarkdownRenderer from "../components/Markdown/MarkdownRenderer";
import { markdownPageInitialValue } from "../helpers/markdownPageInitialValue";
import { getInitialStateFromLocalStorage } from "../helpers/getInitialStateFromLocalStorage";
import BackButton from "../components/BackButton";
import { AutoResizeTextarea } from "../components/Markdown/AutoResizeTextarea";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { exportOptions } from "../data/exportOptions";
import { MarkdownExportService } from "../services/MarkdownExportService";
import { CookieManager } from "../helpers/CookieManager";
import AuthService from "../services/AuthService";

const MarkdownPage = () => {
  const [loading, setLoading] = useState(false);
  const [markdownValue, setMarkdownValue] = useState(
    () =>
      getInitialStateFromLocalStorage(
        "markdownValue",
        markdownPageInitialValue
      ) as string
  );
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem("markdownValue", JSON.stringify(markdownValue));
  }, [markdownValue]);

  const handleInputChange:
    | React.ChangeEventHandler<HTMLTextAreaElement>
    | undefined = (e) => {
    let inputValue = e.target.value;
    setMarkdownValue(inputValue);
  };

  const handleExport = (value: string) => {
    setLoading(true);
    MarkdownExportService.export(markdownValue, value)
      .then(() => {
        toast({
          title: "Exported successfully",
          status: "success",
          duration: 3000,
          position: "bottom-right",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: err.response.status === 403 ? "Unauthorized" : err.message,
          status: "error",
          duration: 3000,
          position: "bottom-right",
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <MotionWrapper>
      <Menu>
        {AuthService.isLoggedIn() === false ? (
          <Tooltip
            label={"To use this feature please login"}
            placement={"bottom-start"}
          >
            <MenuButton
              isDisabled={AuthService.isLoggedIn() === false}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant={"ghost"}
            >
              Export as...
            </MenuButton>
          </Tooltip>
        ) : (
          <MenuButton
            isDisabled={AuthService.isLoggedIn() === false}
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant={"ghost"}
          >
            Export as...
          </MenuButton>
        )}
        <MenuList>
          {exportOptions.map((item) => (
            <MenuItem
              value={item.name}
              key={item.id}
              onClick={() => handleExport(item.format)}
            >
              {item.icon}
              <Text ml={2}>{item.name}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Flex wrap={"wrap"} mt={4}>
        <Box flex={1}>
          <AutoResizeTextarea
            isDisabled={loading}
            value={markdownValue}
            onChange={handleInputChange}
            placeholder="Write any markdown text here..."
          />
        </Box>
        <Box flex={1} pl={8}>
          <MarkdownRenderer markdownValue={markdownValue} />
        </Box>
      </Flex>
    </MotionWrapper>
  );
};

export default MarkdownPage;
