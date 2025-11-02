'use client';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  onConfirm,
  onCancel,
  type = 'danger',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const typeClasses = {
    danger: 'btn-error',
    warning: 'btn-warning',
    info: 'btn-info',
  };

  return (
    <div
      className="modal modal-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <div className="modal-box">
        <h3 id="confirm-dialog-title" className="mb-4 text-lg font-bold">
          {title}
        </h3>
        <p id="confirm-dialog-description" className="py-4">
          {message}
        </p>
        <div className="modal-action" role="group" aria-label="Actions de confirmation">
          <button onClick={onCancel} className="btn btn-ghost" aria-label={cancelText}>
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`btn ${typeClasses[type]}`}
            aria-label={confirmText}
          >
            {confirmText}
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onCancel} aria-hidden="true"></div>
    </div>
  );
}
