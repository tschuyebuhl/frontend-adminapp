export type FormColumn<T> = {
  header: string;
  label?: string;
  accessorKey: keyof T;
  type?: 'string' | 'number';
};