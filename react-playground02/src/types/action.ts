export type Action = {
  type: string;
  payload: any;

  do(): void;
  undo(): void;
}
