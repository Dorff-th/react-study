export type ActionLog = {
  id: string;
  type: "ADD" | "UNDO";
  title: string;
  timestamp: string;
}
