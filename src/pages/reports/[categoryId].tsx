import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

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



  const [report, setReport] = useState<IReport | undefined>(undefined);

  useEffect(() => {
    setReport(() => {
      return reports.find(r => r.categoryId === categoryId);
    });
  }, [categoryId, reports]);

  return (
    <div className={styles.reportContainer}>
      <Head>
        <title>Results | Teste Dev Frontend</title>
      </Head>
      <div className={styles.reportCard}>
        <header>
          <div>
            <Image
              src="/mascot.svg"
              width={105}
              height={115}
              alt="Mascot"
              objectFit="contain"
            />
            <div>
              <p>Congratulations!</p>
              <p>You finished the test</p>
            </div>
          </div>
          <span>See your performance on the questions</span>
        </header>
        {report ? (
          <div className={styles.resultValues}>
            <div className={styles.total}>
              <span>
                {report.score.easy.hit + report.score.medium.hit + report.score.hard.hit}
                <small>Hits</small>
              </span>
              <span>
                {report.score.easy.miss + report.score.medium.miss + report.score.hard.miss}
                <small>Miss</small>
              </span>
            </div>
            <div className={styles.difficulties}>
              <div>
                <ul>
                  <li>Easy</li>
                  <li>Hits: {report.score.easy.hit}</li>
                  <li>Miss: {report.score.easy.miss}</li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>Medium</li>
                  <li>Hits: {report.score.medium.hit}</li>
                  <li>Miss: {report.score.medium.miss}</li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>Hard</li>
                  <li>Hits: {report.score.hard.hit}</li>
                  <li>Miss: {report.score.hard.miss}</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.resultValues}>
            <p>Not found</p>
          </div>
        )}

        <Link href="/" passHref>
          <button type="button">Back to start</button>
        </Link>
      </div>
    </div >
  );
}
