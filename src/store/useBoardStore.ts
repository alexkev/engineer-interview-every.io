import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

const zustandStorage: StateStorage = {
  getItem: (name: string) => {
    const value: any = localStorage.getItem(name);
    return value ?? null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    return localStorage.removeItem(name);
  },
};

export type Task = {
  id: string;
  text: string;
  createdAt: Date;
};

type BoardStore = {
  // Board structure: board[0] = Todo, board[1] = In Progress, board[2] = Done
  columnNames: string[];
  board: Task[][];
  
  // Actions
  addTask: (text: string) => void;
  moveTaskRight: (columnIndex: number, taskIndex: number) => void;
  moveTaskLeft: (columnIndex: number, taskIndex: number) => void;
  removeTask: (columnIndex: number, taskIndex: number) => void;
  moveTask: (sourceColumn: number, sourceIndex: number, destColumn: number, destIndex: number) => void;
  
  // Helper methods
  getColumnNames: () => string[];
  getTaskCount: (columnIndex: number) => number;
  canMoveLeft: (columnIndex: number) => boolean;
  canMoveRight: (columnIndex: number) => boolean;
};

const COLUMN_NAMES = ['Todo', 'In Progress', 'Done'];

export const useBoardStore = create<BoardStore>()(
  persist(
    (set, get) => ({
      // Initialize with empty columns
      columnNames: COLUMN_NAMES,
      board: [[], [], []],
      
      addTask: (text: string) => {
        if (!text.trim()) return;
        
        const newTask: Task = {
          id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          text: text.trim(),
          createdAt: new Date(),
        };
        
        set((state: any) => {
          const newBoard = [...state.board];
          newBoard[0] = [...newBoard[0], newTask]; // Add to Todo column
          return { board: newBoard };
        });
      },
      
      moveTaskRight: (columnIndex: number, taskIndex: number) => {
        const { board } = get();
        
        // Can't move right from the last column
        if (columnIndex >= board.length - 1) return;
        
        // Check if task exists
        if (taskIndex < 0 || taskIndex >= board[columnIndex].length) return;
        
        set((state: any) => {
          const newBoard = [...state.board];
          const task = newBoard[columnIndex][taskIndex];
          
          // Remove from current column
          newBoard[columnIndex] = newBoard[columnIndex].filter((_: any, index: number) => index !== taskIndex);
          
          // Add to next column
          newBoard[columnIndex + 1] = [...newBoard[columnIndex + 1], task];
          
          return { board: newBoard };
        });
      },
      
      moveTaskLeft: (columnIndex: number, taskIndex: number) => {
        const { board } = get();
        
        // Can't move left from the first column
        if (columnIndex <= 0) return;
        
        // Check if task exists
        if (taskIndex < 0 || taskIndex >= board[columnIndex].length) return;
        
        set((state: any) => {
          const newBoard = [...state.board];
          const task = newBoard[columnIndex][taskIndex];
          
          // Remove from current column
          newBoard[columnIndex] = newBoard[columnIndex].filter((_: any, index: number) => index !== taskIndex);
          
          // Add to previous column
          newBoard[columnIndex - 1] = [...newBoard[columnIndex - 1], task];
          
          return { board: newBoard };
        });
      },
      
      removeTask: (columnIndex: number, taskIndex: number) => {
        const { board } = get();
        
        // Check if task exists
        if (columnIndex < 0 || columnIndex >= board.length) return;
        if (taskIndex < 0 || taskIndex >= board[columnIndex].length) return;
        
        set((state: any) => {
          const newBoard = [...state.board];
          newBoard[columnIndex] = newBoard[columnIndex].filter((_: any, index: number) => index !== taskIndex);
          return { board: newBoard };
        });
      },
      
      // For drag and drop functionality (bonus feature)
      moveTask: (sourceColumn: number, sourceIndex: number, destColumn: number, destIndex: number) => {
        const { board } = get();
        
        // Validate indices
        if (sourceColumn < 0 || sourceColumn >= board.length) return;
        if (destColumn < 0 || destColumn >= board.length) return;
        if (sourceIndex < 0 || sourceIndex >= board[sourceColumn].length) return;
        if (destIndex < 0 || destIndex > board[destColumn].length) return;
        
        set((state: any) => {
          const newBoard = [...state.board];
          const task = newBoard[sourceColumn][sourceIndex];
          
          // Remove from source column
          newBoard[sourceColumn] = newBoard[sourceColumn].filter((_: any, index: number) => index !== sourceIndex);
          
          // Insert into destination column at specific index
          newBoard[destColumn].splice(destIndex, 0, task);
          
          return { board: newBoard };
        });
      },
      
      // Helper methods
      getColumnNames: () => get().columnNames,
      
      getTaskCount: (columnIndex: number) => {
        const { board } = get();
        if (columnIndex < 0 || columnIndex >= board.length) return 0;
        return board[columnIndex].length;
      },
      
      canMoveLeft: (columnIndex: number) => columnIndex > 0,
      
      canMoveRight: (columnIndex: number) => {
        const { board } = get();
        return columnIndex < board.length - 1;
      },
    }),
    {
      name: 'board-storage',
      storage: createJSONStorage(() => zustandStorage),
      // Rehydrate dates properly
      onRehydrateStorage: () => (state: any) => {
        if (state) {
          // Convert date strings back to Date objects
          state.board = state.board.map((column: any) =>
            column.map((task: any) => ({
              ...task,
              createdAt: new Date(task.createdAt),
            }))
          );
        }
      },
    },
  ),
);