
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
import { useService } from "@/hooks/useService";


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
  const setIsPrestaChoose = useCustomModal.use.setIsPrestaAlreadyChoose();
  const titleModal = useCustomModal.use.title();
  const subtitleModal = useCustomModal.use.subtitle();

  const displayTitle = useCustomModal.use.displayTitle();

  const setServiceId = useService.use.setServiceId();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={() => {
      setClose()
      setIsPrestaChoose(false)
      setServiceId(null)
    }}>
      <DialogContent
        className={cn("overflow-scroll sm:w-full sm:max-w-lg md:max-w-xl md:h-fit h-screen bg-card", modalContainer)}>

        {displayTitle && (
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-bold font-mclaren">{titleModal || title}</DialogTitle>
            <DialogDescription>{subtitleModal || subheading}</DialogDescription>
          </DialogHeader>
        )}

        {children}

      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;