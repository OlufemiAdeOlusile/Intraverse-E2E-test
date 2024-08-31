import path from 'path';
import findRoot from 'find-root';

export const getUploadDocFilePath = (): string => {
  const projectRoot: string = findRoot(__dirname);
  return path.join(projectRoot, 'documents', `testUploadDocument.pdf`);
};

export const getLogoFilePath = (): string => {
  const projectRoot: string = findRoot(__dirname);
  return path.join(projectRoot, 'documents', `Free_logo.svg.png`);
};

export const calculateDate = (
  monthOffset: number,
  day: string,
): { date: string; fullDate: string } => {
  const currentDate: Date = new Date();
  let month: number = currentDate.getMonth() + 1 + monthOffset;
  let year: number = currentDate.getFullYear();

  if (month > 12) {
    month = month % 12;
    year += 1;
  }

  // Format month and day to always be two digits
  const formattedMonth: string = month.toString().padStart(2, '0');
  const formattedDay: string = day.padStart(2, '0');

  const date: string = `${year}-${formattedMonth}-${formattedDay}`;
  const fullDate: string = new Date(`${date}T00:00:00`).toUTCString();

  return { date, fullDate };
};
