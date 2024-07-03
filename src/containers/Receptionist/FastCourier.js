import React from "react";
import { mailFormField } from "../../data/formFields";
import { Box } from "@mui/material";
import PostForm from "../../components/Forms/PostForm";
import CostForm from "../../components/Forms/CostForm";

const FastCourier = () => {
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
    <div className="grid sm:grid-cols-12 grid-cols-1">
      <div className="rounded-lg sm:col-span-4 min-h-[100px] bg-white-500 items-center justify-center">
        <CostForm />
      </div>
      <div className="rounded-lg sm:col-span-8 min-h-[100px] bg-white-500  items-center justify-center">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          paddingTop={2}
        >
          <PostForm
            formTitle={"Fast Courier"}
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
    </div>
  );
};

export default FastCourier;
