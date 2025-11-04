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
    <Card className="h-fit min-h-[600px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-center text-card-foreground">
          {title}
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({tasks.length})
          </span>
        </CardTitle>
      </CardHeader>
      <Droppable droppableId={columnIndex.toString()}>
        {(provided, snapshot) => (
          <CardContent 
            className={`space-y-3 pt-4 ${snapshot.isDraggingOver ? 'bg-accent/10' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
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