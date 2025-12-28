export type Todo = {
    id : string;
    title : string;
    completed : boolean;
    date: string; // "YYYY-MM-DD"
}

export type TodosByDate = Record<string, Todo[]>;