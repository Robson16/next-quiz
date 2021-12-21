import Cookies from 'js-cookie';
import { createContext, ReactNode, useState } from 'react';

interface IPoint {
  hit: number,
  miss: number,
}

interface IDifficultyPoints {
  easy: IPoint,
  medium: IPoint,
  hard: IPoint,
}

interface IReport {
  categoryId: number;
  points: IDifficultyPoints;
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
    const reportsFromCookies = Cookies.get('next_quiz_reports');
    return (reportsFromCookies) ? JSON.parse(reportsFromCookies) : [];
  });

  function saveReport(report: IReport) {
    const reportsString = JSON.stringify([...reports, report]);
    Cookies.set('next_quiz_reports', reportsString);
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
