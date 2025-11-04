import { useState } from 'react';
import { useBoardStore } from '@/store/useBoardStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export function AddTaskForm() {
  const [taskText, setTaskText] = useState('');
  const { addTask } = useBoardStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (taskText.trim()) {
      addTask(taskText.trim());
      setTaskText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-center text-card-foreground">
          Add New Task
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter a new task..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              maxLength={200}
            />
            <Button 
              type="submit" 
              disabled={!taskText.trim()}
              className="px-3"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {taskText.length > 150 && (
            <p className="text-xs text-muted-foreground">
              {taskText.length}/200 characters
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}