type Email = {
  id: string;
  from: string;
  subject: string;
  timestamp: string;
  page: number;
};

type Settings = {
  LIMIT: number;
};

type EmailsPerPageCount = {
  [key: string]: number;
};

type YopmailData = {
  mail: string;
  settings: Settings;
  filteredSearch: Record<string, unknown>;
  pageCount: number;
  totalEmails: number;
  emailsPerPageCount: EmailsPerPageCount;
  exploredPageCount: number;
  fetchedEmailCount: number;
  inbox: Email[];
};

type EmailContent = {
  id: string;
  submit: string;
  from: string;
  date: string;
  deliverability: string;
  attachments: Record<string, unknown>;
  format: string;
  selector: string | null;
  eq: string | null;
  attribute: string | null;
  pathToSave: string | null;
  content: string;
  info: unknown[];
};
