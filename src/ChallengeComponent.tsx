import { useBoardStore } from '@/store/useBoardStore';
import { Column } from './components/Column.tsx';
import { AddTaskForm } from './components/AddTaskForm.tsx';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

export function ChallengeComponent() {
  const { board, getColumnNames, moveTask } = useBoardStore();
  const columnNames = getColumnNames();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // If dropped outside a droppable area
    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumnIndex = parseInt(source.droppableId);
    const destColumnIndex = parseInt(destination.droppableId);

    moveTask(
      sourceColumnIndex,
      source.index,
      destColumnIndex,
      destination.index
    );
  };

  return (
    <div className="w-full max-w-6xl p-6 h-full">
      <h1 className="text-3xl font-bold text-left mb-8 text-gray-800">
        Todo Board
      </h1>
      
      {/* Board Columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          {board.map((tasks, columnIndex) => (
            <Column
            key={columnIndex}
            columnIndex={columnIndex}
            title={columnNames[columnIndex]}
            tasks={tasks}
            />
          ))}
        </div>
      </DragDropContext>
      
      {/* Add Task Form */}
      <AddTaskForm />
    </div>
  );
}