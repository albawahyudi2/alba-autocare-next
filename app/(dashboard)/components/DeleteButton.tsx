'use client';

interface DeleteButtonProps {
  deleteAction: (formData: FormData) => void;
  itemId: string;
  confirmMessage: string;
  className?: string;
  buttonText?: string;
  buttonClassName?: string;
}

export function DeleteButton({ 
  deleteAction, 
  itemId, 
  confirmMessage, 
  className = "inline",
  buttonText = "Hapus",
  buttonClassName = "text-red-500 hover:text-red-400"
}: DeleteButtonProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!confirm(confirmMessage)) {
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    deleteAction(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input type="hidden" name="id" value={itemId} />
      <button
        type="submit"
        className={buttonClassName}
      >
        {buttonText}
      </button>
    </form>
  );
}
