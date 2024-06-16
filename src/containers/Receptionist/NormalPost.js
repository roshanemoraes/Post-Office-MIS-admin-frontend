import { Box } from "@mui/material";
import React from "react";
import PostForm from "../../components/Forms/PostForm";
import { Navigate, useNavigate } from "react-router-dom";
import { mailFormField } from "../../data/formFields";

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

  return (
    <div>
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
      </Box>
    </div>
  );
};

export default NormalPost;
