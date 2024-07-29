import React from "react";

interface Props {
  title: string;
}

export default function ButtonElement({ title }: Props) {
  return (
    <button className="btn-primary" type="submit">
      {title}
    </button>
  );
}
