import { createContext, useContext } from "react";
import { useState } from "react";

type AuthContextType = {
  transitioning: boolean;
  setTransitioning: (s: boolean) => void;
};

const TransitionContext = createContext<AuthContextType | undefined>(undefined);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transitioning, setTransitioning] = useState(false);

  return (
    <TransitionContext.Provider
      value={{
        transitioning,
        setTransitioning,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTransitioning() {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error(
      "useTransitioning must be used within <TransitionProvider>",
    );
  return ctx;
}
