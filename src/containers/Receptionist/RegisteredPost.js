import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { mailFormField } from "../../data/formFields";
import { Box } from "@mui/material";
import PostForm from "../../components/Forms/PostForm";

const RegisteredPost = () => {
  const Navigate = useNavigate();

  const senderFields = [
    mailFormField.senderName,
    mailFormField.senderCity,
    mailFormField.senderAddress,
    mailFormField.senderPhone,
  ];

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
          formTitle={"Registered Post"}
          fieldsGroups={[
            { label: "Sender:", fields: senderFields },
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

export default RegisteredPost;
