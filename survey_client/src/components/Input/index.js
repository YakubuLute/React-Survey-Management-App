import React from "react";
import "./index.css";
import { I, TInput, Label } from "./styles";

export default function Input({ icon, label, type, id, ...rest }) {
  return (
    <div className="input-field">
      {icon && <I className="material-icons prefix">{icon}</I>}
      <TInput id={id} type={type} required className="validate" {...rest} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
