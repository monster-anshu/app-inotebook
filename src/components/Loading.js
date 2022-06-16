import React, { useContext } from "react";

import { alertContext } from "../context/AlertContext";

export default function Loading() {
  const { loading } = useContext(alertContext);
  return (
    loading && (
      <>
        <div className=" loading">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    )
  );
}
