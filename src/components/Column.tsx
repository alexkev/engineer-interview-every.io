import { Task } from '@/store/useBoardStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskItem } from './TaskItem.tsx';
import { Droppable } from '@hello-pangea/dnd';

interface ColumnProps {
  columnIndex: number;
  title: string;
  tasks: Task[];
}

export function Column({ columnIndex, title, tasks }: ColumnProps) {
  return (
    <Card className="h-fit min-h-[400px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-center">
          {title}
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({tasks.length})
          </span>
        </CardTitle>
      </CardHeader>
      <Droppable droppableId={columnIndex.toString()}>
        {(provided, snapshot) => (
          <CardContent 
            className={`space-y-3 pt-4 ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                No tasks yet
              </div>
            ) : (
              tasks.map((task, taskIndex) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  columnIndex={columnIndex}
                  taskIndex={taskIndex}
                />
              ))
            )}
            {provided.placeholder}
          </CardContent>
        )}
      </Droppable>
    </Card>
  );
}