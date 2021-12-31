import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { ReportContext } from '../../contexts/ReportContext';
import { Container, ReportCard, Results } from '../../styles/Report';

import MascotImage from '../../assets/mascot.svg';

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
    <Container>
      <Head>
        <title>Results | Next Quiz</title>
      </Head>
      <ReportCard>
        <header>
          <div>
            <MascotImage />
            <div>
              <p>Congratulations!</p>
              <p>You finished the test</p>
            </div>
          </div>
          <span>See your performance on the questions</span>
        </header>
        {report ? (
          <Results>
            <div className="total">
              <span>
                {report.points.easy.hit + report.points.medium.hit + report.points.hard.hit}
                <small>Hits</small>
              </span>
              <span>
                {report.points.easy.miss + report.points.medium.miss + report.points.hard.miss}
                <small>Miss</small>
              </span>
            </div>
            <div className="difficulties">
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
          </Results>
        ) : (
          <Results>
            <p>Not found</p>
          </Results>
        )}

        <Link href='/' passHref>
          <button type='button'>Back to start</button>
        </Link>
      </ReportCard>
    </Container >
  );
}
