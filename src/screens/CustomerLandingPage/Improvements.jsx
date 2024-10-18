import React from "react";

const Improvements = () => {
  return (
    <div id="improvements" className="border-b border-neutral-900 pb-4">
      <h1 className="my-20 text-center text-4xl">IMPROVEMENTS</h1>

      <div className="grid grid-cols-2 mx-[50px] mr-2">
        {/* Old System */}
        <div className="col-span-1 text-center">
          <div>
            <h1 className="text-[#7f1d1d] mb-6">Current Manual System</h1>
          </div>
          <div className="text-[#fee2e2] mb-3">
            Postman delivering mails by his experience. It is hard for the
            postman to find delivery locations if he is appointed for a new
            region.
          </div>
          <div className="text-[#f87171] mb-3">
            Delivering mails according to the postmasters mindmap costing time
            and resources.
          </div>
          <div className="text-#fee2e2] mb-3">
            Keeping physical ledgers to mark the delivery status can cause
            issues.
          </div>
          <div className="text-[#f87171] mb-3">
            Manual address validation process at the postoffice wasting lot of
            time.
          </div>
          <div className="text-[#fee2e2] mb-3">
            Traditional stamp printing and pasting.
          </div>
          <div className="text-[#f87171] mb-3">
            Users didn't know whether their mails are delivered or not.
          </div>
          <div className="text-[#fee2e2] mb-3">
            Less caring about undelivered mail items. Receiver had to come to
            the postoffice to check.
          </div>
          <div className="text-[#f87171] mb-3">
            No money ordering capabilities from home. User had to go to the
            postoffice to place an order.
          </div>
        </div>
        {/* New System */}
        <div className="col-span-1 text-center">
          <div>
            <h1 className="text-[#7f1d1d] mb-6">Newly introduced System</h1>
          </div>
          <div className="text-[#fee2e2] mb-3">
            The system depicts delivery locations in a map. So it's much easy
            for the postman.
          </div>
          <div className="text-[#f87171] mb-3">
            The system generates a optimized route for the delivery saving
            delivery time and cost.
          </div>
          <div className="text-[#fee2e2] mb-3">
            The mobile application supports mail status update feature.
          </div>
          <div className="text-[#f87171] mb-3">
            Address validation process is automated so that complete within
            minutes.
          </div>
          <div className="text-[#fee2e2] mb-3">
            Barcode is generated including postage details.
          </div>
          <div className="text-[#f87171] mb-3">
            Users can track whether the mail items are successfully delivered or
            not.
          </div>
          <div className="text-[#fee2e2] mb-3">
            Now all mails are secure as the system cares about undelivered mail
            items also.
          </div>
          <div className="text-[#f87171] mb-3">
            Now money orders are at fingerprint distance. User can place an
            order from home.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Improvements;
