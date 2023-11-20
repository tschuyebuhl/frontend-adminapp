export type FormColumn<T> = {
  header: string;
  label?: string;
  accessorKey: keyof T;
  type?: 'string' | 'number';
};

export interface ColumnDef<T> extends Record<string, any> {
  header: string;
  accessorKey: keyof T;
  type: 'text' | 'select' | 'number' | 'date' | 'array';
  accessorFn?: (row: T) => string | number | string[] | number[];
}
