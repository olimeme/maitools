import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import DarkModeSwitch from "./components/DarkModeSwitch";

function App() {
  return (
    <div className="App">
      <Flex>
        <Box p="4">
          <Button variant="ghost">mintools</Button>
        </Box>
        <Spacer />
        <Box p="4">
          <Button variant="ghost">tools</Button>
          <DarkModeSwitch />
        </Box>
      </Flex>
    </div>
  );
}

export default App;
