import { useBoardStore } from '@/store/useBoardStore';
import { Column } from './components/Column.tsx';
import { AddTaskForm } from './components/AddTaskForm.tsx';

export function ChallengeComponent() {
  const { board, getColumnNames } = useBoardStore();
  const columnNames = getColumnNames();

  return (
    <div className="w-full max-w-6xl mx-auto p-6 h-full">
      <h1 className="text-3xl font-bold text-left mb-8 text-gray-800">
        Todo Board
      </h1>
      
      {/* Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {board.map((tasks, columnIndex) => (
        <Column
        key={columnIndex}
        columnIndex={columnIndex}
        title={columnNames[columnIndex]}
        tasks={tasks}
        />
      ))}
      </div>
      
      {/* Add Task Form */}
      <AddTaskForm />
    </div>
  );
}