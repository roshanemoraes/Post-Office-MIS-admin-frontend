import { Box, Button } from "@mui/material";
import React, { useRef } from "react";
import PostForm from "../../components/Forms/PostForm";
import { Navigate, useNavigate } from "react-router-dom";
import { mailFormField } from "../../data/formFields";
import { useReactToPrint } from "react-to-print";

const NormalPost = () => {
  const Navigate = useNavigate();

  const recipientFields = [
    mailFormField.recipientName,
    mailFormField.recipientCity,
    mailFormField.recipientAddress,
  ];
  const transactionFields = [mailFormField.cost];

  const handleSubmit = async (formstate) => {
    console.log(formstate);
  };
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
    <div ref={contentToPrint}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        p={2}
      >
        <PostForm
          formTitle={"Normal Post"}
          fieldsGroups={[
            { label: "Recipient:", fields: recipientFields },
            { label: "Transaction:", fields: transactionFields },
          ]}
          selectionGroups={[]}
          onFormSubmit={handleSubmit}
        />
        <Button
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          PRINT
        </Button>
      </Box>
    </div>
  );
};

export default NormalPost;
