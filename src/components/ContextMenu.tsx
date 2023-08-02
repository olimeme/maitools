import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export interface IContextnMenuItem {
  id: number;
  text: string;
  onClick: () => void;
}

interface ContextMenuProps {
  menuItems: IContextnMenuItem[];
}

const ContextMenu = ({ menuItems }: ContextMenuProps) => {
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const handleClick = () => setClicked(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            onContextMenu={(e) => {
              e.preventDefault();
              setClicked(true);
              setPoints({
                x: e.pageX,
                y: e.pageY,
              });
              console.log("Right Click", e.pageX, e.pageY);
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ContextMenu;
