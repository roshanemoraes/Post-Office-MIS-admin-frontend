import { Box } from "@mui/material";
import React from "react";
import PostForm from "../../components/Forms/PostForm";
import { mailFormField } from "../../data/formFields";
import CostForm from "../../components/Forms/CostForm";

const NormalPost = () => {
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
    <div className="grid sm:grid-cols-12 grid-cols-1">
      <div className="rounded-lg sm:col-span-4 min-h-[100px] bg-white-500 items-center justify-center">
        <CostForm />
      </div>
      <div className="rounded-lg sm:col-span-8 min-h-[100px] bg-white-500  items-center justify-center">
        <Box
          display="flex"
          paddingTop={2}
          flexDirection="row"
          justifyContent="space-around"
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
    </div>
  );
};

export default NormalPost;
