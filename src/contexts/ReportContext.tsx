import { createContext, ReactNode, useEffect, useState } from "react";

interface IScore {
  easy: {
    hit: number;
    miss: number;
  };
  medium: {
    hit: number;
    miss: number;
  };
  hard: {
    hit: number;
    miss: number;
  };
}

interface IReport {
  categoryId: number;
  score: IScore;
}

interface ReportContextData {
  reports: IReport[];
  saveReport: (report: IReport) => void;
}

interface ReportProviderProps {
  children: ReactNode;
}

export const ReportContext = createContext({} as ReportContextData);

export function ReportProvider({ children }: ReportProviderProps) {
  const [reports, setReports] = useState<IReport[]>([]);

  async function saveReport(report: IReport) {
    setReports([...reports, report]);
  }

  useEffect(() => {
    console.log(reports);
  }, [reports]);

  return (
    <ReportContext.Provider
      value={{
        reports,
        saveReport,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}
