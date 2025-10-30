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
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button onClick={onCancel} className="btn btn-ghost">{cancelText}</button>
          <button onClick={onConfirm} className={`btn ${typeClasses[type]}`}>{confirmText}</button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onCancel}></div>
    </div>
  );
}
