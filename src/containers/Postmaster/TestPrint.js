import { Button } from "@mui/material";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const TestPrint = () => {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "TestPrint",
    onBeforePrint: () => {
      console.log("Before print");
    },
    onAfterPrint: () => {
      console.log("After print");
    },
    removeAfterPrint: true,
  });

  return (
    <div>
      <div ref={contentToPrint}>This is TestPrint...</div>
      <Button
        onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}
      >
        PRINT
      </Button>
    </div>
  );
};
