import { useBoardStore } from '@/store/useBoardStore';
import { Column } from './components/Column.tsx';
import { AddTaskForm } from './components/AddTaskForm.tsx';
import { ThemeToggle } from './components/ThemeToggle.tsx';
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
    <div className="w-full p-6 h-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-left text-foreground">
          Todo Board
        </h1>
        {/* Circle blur animation */}
        <ThemeToggle />
      </div>
      
      {/* Board Columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-justify gap-6 my-6">
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