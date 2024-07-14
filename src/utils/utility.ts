import path from 'path';
import findRoot from 'find-root';

export const getUploadDocFilePath = (): string => {
  const projectRoot: string = findRoot(__dirname);
  return path.join(projectRoot, 'documents', `testUploadDocument.pdf`);
};
