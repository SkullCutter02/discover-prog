import React from "react";
import { FaStar } from "react-icons/fa";

interface Props {
  isFilled: boolean;
}

const Star: React.FC<Props> = ({ isFilled }) => {
  return (
    <>
      <FaStar color={isFilled ? "#ffce31" : "gray"} />
    </>
  );
};

export default Star;
