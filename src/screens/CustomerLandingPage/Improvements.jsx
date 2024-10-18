import React from "react";

const Improvements = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <h1 className="mt-20 mb-10 text-center text-4xl text-white">
        IMPROVEMENTS
      </h1>

      <div className="grid grid-cols-11 mx-[50px] mr-2">
        {/* Old System */}
        <div className="col-span-5 text-center">
          <div>
            <h1 className="text-[#ff1616] mb-8">Current Manual System</h1>
          </div>
          <ul className="list-disc text-left list-inside text-[#fff] grid gap-y-4">
            <li className="row-span-1 mb-[8px]">
              Postman delivering mails by his experience. It is hard to find
              delivery locations if he is appointed for a new region.
            </li>
            <li className="row-span-1 mb-[8px] text-[#ffb039]">
              Delivering mails according to the postmasters mindmap costing time
              and resources.
            </li>
            <li className="row-span-1 mb-[8px]">
              Keeping physical ledgers to mark the delivery status can cause
              issues for the postman.
            </li>
            <li className="row-span-1 mb-[8px] text-[#f87171]">
              Manual address validation process at the post office wasting a lot
              of time.
            </li>
            <li className="row-span-1 mb-[8px]">
              Traditional stamp printing and pasting.
            </li>
            <li className="row-span-1 mb-[8px] text-[#f87171]">
              There was no method for customers to track their undelivered
              mails, or to even know about such mails.
            </li>
            <li className="row-span-1 mb-[8px]">
              Less caring about undelivered mail items. Receiver had to come to
              the post office to check.
            </li>
            <li className="row-span-1 mb-[8px] text-[#f87171]">
              No money ordering capabilities from home. User had to go to the
              post office to place an order.
            </li>
          </ul>
        </div>

        <div className="col-span-1 text-center"></div>

        {/* New System */}
        <div className="col-span-5 text-center">
          <div>
            <h1 className="text-[#ff0808] mb-8">Newly introduced System</h1>
          </div>
          <ul className="list-disc text-left list-inside text-[#fff] grid gap-y-4">
            <li className="row-span-1 mb-[8px]">
              The system depicts delivery locations on a map, making it much
              easier for the postman.
            </li>
            <li className="row-span-1 mb-[8px] text-[#f87171]">
              The system generates an optimized route for the delivery, saving
              delivery time and cost.
            </li>
            <li className="row-span-1 mb-[8px]">
              The postman can directly record the delivery status through the
              mobile app when he visits a delivery location.
            </li>
            <li className="row-span-1 mb-[8px] text-[#f87171]">
              Address validation process is automated, completing within
              minutes.
            </li>
            <li className="row-span-1 mb-[8px]">
              Barcodes are generated including postage details.
            </li>
            <li className="row-span-1 mb-[8px] text-[#f87171]">
              Users can track whether their mail items are successfully
              delivered or not.
            </li>
            <li className="row-span-1 mb-[8px]">
              Now all mails are secure as the system also cares about
              undelivered mail items.
            </li>
            <li className="row-span-1 mb-[8px] text-[#f87171]">
              Money orders can be placed from home with ease.
              <div id="signinsection"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Improvements;
