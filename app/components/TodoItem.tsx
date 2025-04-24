'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Todo } from '../types/todo';
import { Dialog, Menu } from '@headlessui/react';
import { EllipsisHorizontalIcon, TrashIcon, XMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

// Helper function to get ordinal suffix
const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const ordinalSuffix = getOrdinalSuffix(day);
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    return `${weekday}, ${day}${ordinalSuffix} ${month} ${year} at ${time}`;
  };

  const handleEdit = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim());
      setIsEditing(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="todo-item group flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4"
    >
      <div className="checkbox-container flex-shrink-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className={`w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-200 rounded-full flex items-center justify-center ${
          todo.completed ? 'bg-gradient-to-br from-purple-500 to-blue-500 border-none' : ''
        }`}>
          {todo.completed && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </div>
      </div>

      <span 
        className={`flex-1 text-gray-700 text-sm sm:text-base ${
          todo.completed 
            ? 'line-through text-gray-400' 
            : ''
        }`}
      >
        {todo.text}
        <p className="text-xs text-gray-400 mt-1">
          Created: {formatDate(new Date(todo.createdAt))}
        </p>
      </span>

      <Menu as="div" className="relative opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <Menu.Button
          className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => setIsModalOpen(true)}
                className={`${
                  active ? 'bg-gray-50' : ''
                } flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700`}
              >
                <PencilSquareIcon className="h-4 w-4" />
                Edit
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => onDelete(todo.id)}
                className={`${
                  active ? 'bg-gray-50' : ''
                } flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600`}
              >
                <TrashIcon className="h-4 w-4" />
                Delete
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="todo-container w-full max-w-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-medium">
                Edit Todo
              </Dialog.Title>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-2 sm:p-3 todo-input rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
                >
                  Save
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
} 