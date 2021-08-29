import Cookies from 'js-cookie';
import { createContext, ReactNode, useState } from 'react';

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
  const [reports, setReports] = useState<IReport[]>(() => {
    const reportsFromCookies = Cookies.get('reports');
    return (reportsFromCookies) ? JSON.parse(reportsFromCookies) : [];
  });

  function saveReport(report: IReport) {
    const reportsString = JSON.stringify([...reports, report]);
    Cookies.set('reports', reportsString);
    setReports([...reports, report]);
  }

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
