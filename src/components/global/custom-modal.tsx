
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { useCustomModal } from "@/hooks/useCustomModal";


type Props = {
  title: string;
  subheading: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  modalContainer?: string;
};

const CustomModal = ({
  children,
  defaultOpen,
  subheading,
  title,
  modalContainer,
}: Props) => {

    const isOpen = useCustomModal.use.isOpen();
    const setClose = useCustomModal.use.onClose();

  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className={cn("overflow-scroll sm:w-full sm:max-w-lg md:max-w-xl md:h-fit h-screen bg-card", modalContainer)}>
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;