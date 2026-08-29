import { createContext, useContext, type ReactNode } from 'react';

export type QuizImageHydrationContextValue = {
  getPresignedUrl?: ((path: string) => Promise<string | null>) | undefined;
  currentNotePath?: string | null | undefined;
};

const QuizImageHydrationContext = createContext<QuizImageHydrationContextValue>({});

export function QuizImageHydrationProvider({
  value,
  children,
}: {
  value: QuizImageHydrationContextValue;
  children: ReactNode;
}) {
  return (
    <QuizImageHydrationContext.Provider value={value}>
      {children}
    </QuizImageHydrationContext.Provider>
  );
}

export function useQuizImageHydration(): QuizImageHydrationContextValue {
  return useContext(QuizImageHydrationContext);
}
