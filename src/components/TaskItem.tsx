import { Task, useBoardStore } from '@/store/useBoardStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X, GripVertical } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';

interface TaskItemProps {
  task: Task;
  columnIndex: number;
  taskIndex: number;
}

export function TaskItem({ task, columnIndex, taskIndex }: TaskItemProps) {
  const { moveTaskLeft, moveTaskRight, removeTask, canMoveLeft, canMoveRight } = useBoardStore();

  const handleMoveLeft = () => {
    moveTaskLeft(columnIndex, taskIndex);
  };

  const handleMoveRight = () => {
    moveTaskRight(columnIndex, taskIndex);
  };

  const handleRemove = () => {
    removeTask(columnIndex, taskIndex);
  };

  return (
    <Draggable draggableId={task.id} index={taskIndex}>
      {(provided, snapshot) => (
        <Card 
          className={`shadow-sm hover:shadow-md transition-shadow ${
            snapshot.isDragging ? 'shadow-lg rotate-2' : ''
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <CardContent className="p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  {/* Drag Handle */}
                  <div 
                    className="mt-1 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
                    {...provided.dragHandleProps}
                  >
                    <GripVertical className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground break-words">
                      {task.text}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground">
                    {task.createdAt.toLocaleDateString()}
                  </p>
                  
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {/* Move Left Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={handleMoveLeft}
                      disabled={!canMoveLeft(columnIndex)}
                      title="Move to previous column"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    {/* Move Right Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={handleMoveRight}
                      disabled={!canMoveRight(columnIndex)}
                      title="Move to next column"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    
                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={handleRemove}
                      title="Remove task"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}