import { XMarkIcon as XIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const { text, completed, id } = todo;

  return (
    <div className="todo-item group flex items-center gap-4 p-4">
      <button
        onClick={() => onToggle(id)}
        className={`checkbox-container flex items-center justify-center w-6 h-6 border-2 rounded-full transition-colors ${
          completed
            ? 'bg-gradient-to-br from-blue-400 to-purple-500 border-transparent'
            : 'border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400'
        }`}
      >
        {completed && <CheckIcon className="h-3 w-3 text-white" />}
      </button>
      <span
        className={`flex-1 transition-colors ${
          completed
            ? 'text-gray-400 dark:text-gray-500 line-through'
            : 'text-gray-700 dark:text-gray-300'
        }`}
      >
        {text}
      </span>
      <button
        onClick={() => onDelete(id)}
        className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
      >
        <XIcon className="h-5 w-5" />
      </button>
    </div>
  );
} 