'use client';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null;
  const sizeClasses = { sm: 'max-w-sm', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' };

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={`modal-box ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 id="modal-title" className="text-2xl font-bold text-primary">{title}</h3>
          <button onClick={onClose} className="btn btn-circle btn-ghost btn-sm" aria-label="Fermer la fenêtre modale">
            ✕
          </button>
        </div>
        <div className="py-4">{children}</div>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onClose} aria-hidden="true"></div>
    </div>
  );
}
