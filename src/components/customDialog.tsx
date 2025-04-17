import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CustomDialogProps {
  triggerButton: React.ReactNode;
  title: string;
  description: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export function CustomDialog({ triggerButton, title, description, onSubmit, children }: CustomDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerButton}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          {children}
        </form>
      </DialogContent>
    </Dialog>
  );
}