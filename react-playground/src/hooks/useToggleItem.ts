export function useToggleItem<T extends { id: string; completed: boolean }>(
  data: Record<string, T[]>,
  setData: (data: Record<string, T[]>) => void,
  selectedDate: string
) {
  return (id: string) => {
    const updated = {
      ...data,
      [selectedDate]: data[selectedDate].map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    };
    setData(updated);
  };
}
