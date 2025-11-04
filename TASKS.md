# Tasks for Every.io Todo List Challenge

## Core Requirements (from README)

### 1. Board Structure
- [ ] Create a Trello-like board with 3 columns:
  - [ ] Todo (Column 0)
  - [ ] In Progress (Column 1) 
  - [ ] Done (Column 2)

### 2. State Management with Zustand
- [ ] Set up Zustand store for board state
- [ ] Implement 2D array structure: `board: string[][]`
  - [ ] `board[0]` = Todo items
  - [ ] `board[1]` = In Progress items
  - [ ] `board[2]` = Done items
- [ ] Create Zustand actions:
  - [ ] `addTask(text: string)` - Add new task to Todo column
  - [ ] `moveTaskRight(columnIndex: number, taskIndex: number)` - Move task to next column
  - [ ] `moveTaskLeft(columnIndex: number, taskIndex: number)` - Move task to previous column
  - [ ] `removeTask(columnIndex: number, taskIndex: number)` - Remove task (optional)

### 3. Task Item Components
- [ ] Create TaskItem component with:
  - [ ] Task text display
  - [ ] Left arrow button (move to previous column)
  - [ ] Right arrow button (move to next column)
- [ ] Implement button state logic:
  - [ ] Disable left button when task is in first column (Todo)
  - [ ] Disable right button when task is in last column (Done)

### 4. Add New Task Form
- [ ] Create form component below the columns
- [ ] Add text input field
- [ ] Add submit button
- [ ] Handle form submission:
  - [ ] Add task to Todo column (first column)
  - [ ] Clear input after submission
  - [ ] Prevent empty task submission

### 5. UI Components with Shadcn/ui
- [ ] Install and configure Shadcn/ui
- [ ] Use Shadcn components:
  - [ ] `Button` for arrows and form submit
  - [ ] `Input` for task input field
  - [ ] `Card` for task items and columns
  - [ ] `Form` components for new task form
- [ ] Style with Tailwind CSS:
  - [ ] Responsive 3-column layout
  - [ ] Proper spacing and padding
  - [ ] Visual feedback for disabled buttons
  - [ ] Clean, modern design

## Setup Tasks

### 6. Project Dependencies
- [ ] Install Zustand: `npm install zustand`
- [ ] Install Shadcn/ui: `npx shadcn-ui@latest init`
- [ ] Install required Shadcn components:
  - [ ] `npx shadcn-ui@latest add button`
  - [ ] `npx shadcn-ui@latest add input`
  - [ ] `npx shadcn-ui@latest add card`
  - [ ] `npx shadcn-ui@latest add form`

### 7. Component Structure
- [ ] Create store file: `src/store/boardStore.ts`
- [ ] Create components:
  - [ ] `src/components/ChallengeComponent.tsx` - Main board container
  - [ ] `src/components/Column.tsx` - Individual column component
  - [ ] `src/components/TaskItem.tsx` - Individual task component
  - [ ] `src/components/AddTaskForm.tsx` - Form for adding new tasks
- [ ] Update `ChallengeComponent.tsx` to use the new Board component

## Bonus Features

### 8. Drag and Drop (Bonus)
- [ ] Install drag and drop library (e.g., `@hello-pangea/dnd` or `react-beautiful-dnd`)
- [ ] Implement drag and drop functionality:
  - [ ] Make tasks draggable within columns
  - [ ] Allow dropping tasks between columns
  - [ ] Update Zustand store with drag and drop actions:
    - [ ] `moveTask(sourceColumn: number, sourceIndex: number, destColumn: number, destIndex: number)`
  - [ ] Add visual feedback during drag operations
  - [ ] Maintain arrow button functionality alongside drag and drop

### 9. Additional Enhancements (Optional)
- [ ] Add task ID system for better tracking
- [ ] Implement task editing functionality
- [ ] Add task deletion with confirmation
- [ ] Persist board state to localStorage
- [ ] Add animations for task transitions
- [ ] Implement keyboard shortcuts
- [ ] Add task timestamps
- [ ] Dark mode support

## Testing Tasks

### 10. Unit Tests
- [ ] Test Zustand store actions
- [ ] Test component rendering
- [ ] Test form submission
- [ ] Test button state logic
- [ ] Test drag and drop functionality (if implemented)

### 11. Integration Tests
- [ ] Test complete task workflow (add → move → complete)
- [ ] Test edge cases (empty tasks, boundary conditions)

## Code Quality

### 12. Code Organization
- [ ] Ensure readable, well-commented code
- [ ] Follow consistent naming conventions
- [ ] Implement proper TypeScript types
- [ ] Organize components logically
- [ ] Keep components focused and reusable

### 13. Error Handling
- [ ] Handle edge cases gracefully
- [ ] Add proper TypeScript types throughout
- [ ] Implement input validation

## Estimated Time Breakdown
- Setup and dependencies: 15 minutes
- Zustand store implementation: 20 minutes
- Core components (Board, Column, TaskItem): 30 minutes
- Add task form: 15 minutes
- Styling with Shadcn/ui and Tailwind: 20 minutes
- Testing and bug fixes: 15 minutes
- **Bonus drag and drop**: 30-45 minutes

**Total estimated time**: 1.5-2 hours (without bonus features)