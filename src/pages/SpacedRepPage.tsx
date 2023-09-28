import React, { useEffect, useState } from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import DeckDashboard from "../components/SpacedRep/DeckDashboard";
import { AddIcon } from "@chakra-ui/icons";
import { BsListUl } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { getInitialStateFromLocalStorage } from "../helpers/getInitialStateFromLocalStorage";

export type DeckViewTypes = "list" | "gallery";

const SpacedRepPage = () => {
  //   debugger;
  const [deckList, setDeckList] = useState<Array<number>>(
    () => getInitialStateFromLocalStorage("deckList", []) as Array<number>
  );
  const [currentDeckView, setCurrentDeckView] = useState<DeckViewTypes>(
    () =>
      getInitialStateFromLocalStorage(
        "currentDeckView",
        "list"
      ) as DeckViewTypes
  );

  useEffect(() => {
    localStorage.setItem("deckList", JSON.stringify(deckList));
  }, [deckList]);

  useEffect(() => {
    localStorage.setItem("currentDeckView", JSON.stringify(currentDeckView));
  }, [currentDeckView]);

  return (
    <MotionWrapper>
      <ButtonGroup size={"sm"}>
        <Button
          leftIcon={<AddIcon />}
          variant={"ghost"}
          size={"sm"}
          onClick={() =>
            setDeckList((prev) => {
              const newArr = [...prev];
              newArr.push(1);
              return newArr;
            })
          }
        >
          Add deck
        </Button>
        <ButtonGroup isAttached size={"sm"}>
          <IconButton
            icon={<BsListUl />}
            aria-label="list view"
            variant={currentDeckView === "list" ? "solid" : "ghost"}
            onClick={() => {
              setCurrentDeckView("list");
            }}
          ></IconButton>
          <IconButton
            icon={<RxDashboard />}
            aria-label="gallery view"
            variant={currentDeckView === "gallery" ? "solid" : "ghost"}
            onClick={() => {
              setCurrentDeckView("gallery");
            }}
          ></IconButton>
        </ButtonGroup>
        <Button
          onClick={() => {
            localStorage.removeItem("deckList");
            localStorage.removeItem("currentDeckView");
          }}
        >
          clear
        </Button>
      </ButtonGroup>
      <DeckDashboard cards={deckList} view={currentDeckView} />
    </MotionWrapper>
  );
};

export default SpacedRepPage;
