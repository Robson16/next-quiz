import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

import { ReportContext } from '../../contexts/ReportContext';

import styles from './report.module.scss';

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
        <title>Results | Next Quiz</title>
      </Head>
      <div className={styles.reportCard}>
        <header>
          <div>
            <Image
              src='/mascot.svg'
              width={105}
              height={115}
              alt='Mascot'
              objectFit='contain'
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
                {report.points.easy.hit + report.points.medium.hit + report.points.hard.hit}
                <small>Hits</small>
              </span>
              <span>
                {report.points.easy.miss + report.points.medium.miss + report.points.hard.miss}
                <small>Miss</small>
              </span>
            </div>
            <div className={styles.difficulties}>
              <div>
                <ul>
                  <li>Easy</li>
                  <li>Hits: {report.points.easy.hit}</li>
                  <li>Miss: {report.points.easy.miss}</li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>Medium</li>
                  <li>Hits: {report.points.medium.hit}</li>
                  <li>Miss: {report.points.medium.miss}</li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>Hard</li>
                  <li>Hits: {report.points.hard.hit}</li>
                  <li>Miss: {report.points.hard.miss}</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.resultValues}>
            <p>Not found</p>
          </div>
        )}

        <Link href='/' passHref>
          <button type='button'>Back to start</button>
        </Link>
      </div>
    </div >
  );
}
