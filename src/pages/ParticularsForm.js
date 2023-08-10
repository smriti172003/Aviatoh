import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { showPage } from "../App";
import { auth, updateOrCreateDocument, usersCollection } from "../db";
import toaster from "../components/toaster";

function ParticularsForm(props) {
  useEffect(()=>{
    showPage();
});
  const { email } = props;

  const { register, handleSubmit, errors } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {

    // a new field named "particulars" will created in the document 
    updateOrCreateDocument(usersCollection, email, { particulars : data })
      .then((res) => {
        navigate("/profile");
      })
      .catch((err) => {
        toaster(-1, err);
      });
  };

  return (
    <div
      align="left"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        height: "70vh",
      }}
    >
      <div style={{fontSize: '23px'}}>Update your particulars</div>
      <form align="center" onSubmit={handleSubmit(onSubmit)}>
        <br />
        <input
          type="text"
          style={{cursor: 'text'}}
          placeholder="Full Name"
          name="fullname"
          required="true"
          {...register("fullname", { required: true })}
        />
        <br />
        <br />
        <input
          type="text"
          style={{cursor: 'text'}}
          placeholder="Country of Residence"
          name="country"
          required="true"
          {...register("country", { required: true })}
        />
        <br />
        <br />
        <input
          name="year"
          style={{cursor: 'text'}}
          type="number"
          placeholder="Phone number (optional)"
          {...register("phoneNumber", { required: false })}
        />
        <br />
        <br />
        <input
          style={{cursor: 'pointer'}}
          onClick={() => {
            console.log(auth.email);
          }}
          type="submit"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ParticularsForm;
