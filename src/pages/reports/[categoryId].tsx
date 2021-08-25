import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ReportContext } from '../../contexts/ReportContext';

import styles from './report.module.scss';

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

export default function Reports() {
  const { reports } = useContext(ReportContext);
  const router = useRouter();

  const categoryId = Number(router.query.categoryId);

  const [report, setReport] = useState<IReport | undefined>(() => {
    return reports.find((element) => { element.categoryId === categoryId });
  });

  return (
    <>
      <h1>Report</h1>
      <Link href="/">
        <a>
          Close
        </a>
      </Link>
      {report ? (
        <>
          <div>
            <h2>Easy</h2>
            <span>Hits: {report.score.easy.hit}</span>
            <span>Miss: {report.score.easy.miss}</span>
          </div>
          <div>
            <h2>Medium</h2>
            <span>Hits: {report.score.medium.hit}</span>
            <span>Miss: {report.score.medium.miss}</span>
          </div>
          <div>
            <h2>Hard</h2>
            <span>Hits: {report.score.hard.hit}</span>
            <span>Miss: {report.score.hard.miss}</span>
          </div>
        </>
      ) : (
        <h2>Ué?! Cade?</h2>
      )}
    </>
  );
}
