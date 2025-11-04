import { Task, useBoardStore } from '@/store/useBoardStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

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
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 break-words">
              {task.text}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {task.createdAt.toLocaleDateString()}
            </p>
          </div>
          
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
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleRemove}
              title="Remove task"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}