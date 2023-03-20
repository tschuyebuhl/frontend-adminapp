import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface data {
  category: string;
  issueSummary: string;
  email: string;
  mobileNumber: string;
  assignee: string;
  issueDetails: string;
}

export function TicketForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<data> = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('category')}>
        <option value="Question">Question</option>
        <option value="Incident">Incident</option>
        <option value="Service Request">Service Request</option>
        <option value="Feature Request">Feature Request</option>
      </select>
      <input
        type="text"
        placeholder="Issue Summary"
        {...register('Issue Summary', { required: true, maxLength: 100 })}
      />
      <input
        type="text"
        placeholder="Email"
        {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      <input
        type="tel"
        placeholder="Mobile number"
        {...register('Mobile number', { required: true, minLength: 6, maxLength: 12 })}
      />
      <select {...register('Assignee')}>
        <option value="Test">Test</option>
        <option value="Test2">Test2</option>
      </select>
      <textarea {...register('Issue Details', {})} />

      <input type="submit" />
    </form>
  );
}
