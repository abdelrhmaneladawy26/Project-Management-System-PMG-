import React from "react";
import NoDataImage from "../../assets/images/NoData.svg";
export default function NoData() {
  return (
    <div className="text-center ">
      <img src={NoDataImage} title="No Data" />
      <h4 className=" my-3">No Data !</h4>
      <p>
        are you sure you want to delete this item ? if you are sure just click
        on delete it .
      </p>
    </div>
  );
}
