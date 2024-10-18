import React from "react";

const Improvements = () => {
  return (
    <div id="improvements" className="border-b border-neutral-900 pb-4">
      <h1 className="my-20 text-center text-4xl">IMPROVEMENTS</h1>

      <div className="grid grid-cols-2 mx-[50px] mr-2">
        <div className="col-span-1 text-center">
          <div>
            <h1 className="text-[#7f1d1d]">Current Manual System</h1>
          </div>
          <div className="text-[#fee2e2] mb-3">
            Postman delivering mails by his experience. It is hard for the
            postman to find delivery locations if he is appointed for a new
            region.
          </div>
          <div className="text-[#f87171] mb-3">
            Delivering mails according to the postmasters mindmap costing time
            and resournces.
          </div>
          <div className="text-#fee2e2] mb-3">
            Keeping physical ledgers to mark the delivery status can cause a lot
            of problems.
          </div>
        </div>
        <div className="col-span-1 text-center">
          <div>
            <h1 className="text-[#7f1d1d]">Newly introduced System</h1>
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
        </div>
      </div>
    </div>
  );
};

export default Improvements;
