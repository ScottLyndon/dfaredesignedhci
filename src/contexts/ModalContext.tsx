import React, { createContext, useContext, useState } from "react";

export type ModalType = "faq" | "requirements" | "whereToApply" | null;

interface ModalContextType {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  currentModal: ModalType;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [currentModal, setCurrentModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setCurrentModal(type);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, currentModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModals must be used within ModalProvider");
  }
  return context;
}
