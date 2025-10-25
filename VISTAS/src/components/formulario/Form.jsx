import React from "react";
import SubmitButton from "./SubmitButton";
import MessageBox from "./MessageBox";
import FormInput from "./FormInput";

export default function Form({ fields, values, onChange, onSubmit, loading, msg, submitText }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map((field) => (
        <FormInput
          key={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={values[field.name] || ""}
          onChange={onChange}
          disabled={loading}
        />
      ))}

      <MessageBox msg={msg} />
      <SubmitButton loading={loading} text={submitText} />
    </form>
  );
}
