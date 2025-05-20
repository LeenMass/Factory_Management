import React from "react";
import { useParams } from "react-router-dom";

function EditingShift() {
  const { id } = useParams();
  console.log(id);
  return <div>EditingShift</div>;
}

export default EditingShift;
