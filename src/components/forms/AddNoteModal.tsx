import React, { useState } from 'react';
import { repo } from '../../data/local/repo';
import { Note, NoteType, Role } from '../../data/models';

interface AddNoteModalProps {
  patientId: string;
  onClose: () => void;
  onSave: () => void;
}

const NOTE_TYPES: { value: NoteType; label: string }[] = [
  { value: 'general', label: 'عام' },
  { value: 'plan', label: 'خطة' },
  { value: 'risk', label: 'خطر' },
];

export function AddNoteModal({ patientId, onClose, onSave }: AddNoteModalProps) {
  const [text, setText] = useState('');
  const [type, setType] = useState<NoteType>('general');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!text.trim()) {
      alert('Note text cannot be empty.');
      return;
    }

    setIsSaving(true);
    try {
      const newNote: Omit<Note, 'id' | 'createdAt'> = {
        patientId,
        authorName: 'Current User', // Replace with actual user name
        authorRole: Role.Doctor, // Replace with actual user role
        text,
        type,
      };
      await repo.addNote(newNote);
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">إضافة نوت جديد</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="note-text" className="block text-sm font-medium text-gray-700 mb-1">النص</label>
            <textarea
              id="note-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="أدخل نص النوت..."
            />
          </div>
          <div>
            <label htmlFor="note-type" className="block text-sm font-medium text-gray-700 mb-1">النوع</label>
            <select
              id="note-type"
              value={type}
              onChange={(e) => setType(e.target.value as NoteType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {NOTE_TYPES.map(noteType => (
                <option key={noteType.value} value={noteType.value}>{noteType.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            disabled={isSaving}
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={isSaving}
          >
            {isSaving ? 'جاري الحفظ...' : 'حفظ'}
          </button>
        </div>
      </div>
    </div>
  );
}
