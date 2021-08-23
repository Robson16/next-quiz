import { createContext, ReactNode } from "react";

interface QuestionContextData {

}

interface QuestionProviderProps {
  children: ReactNode;
}

export const QuestionContext = createContext({} as QuestionContextData);

export function QuestionProvider({ children, ...rest }: QuestionProviderProps) {


  return (
    <QuestionContext.Provider
      value={{

      }}
    >
      {children}


    </QuestionContext.Provider>
  )
}
