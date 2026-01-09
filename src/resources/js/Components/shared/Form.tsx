import React, { FormEvent } from 'react';

interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function Form({ onSubmit, children, ...props }: FormProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(e);
  }

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
}
