// types/easy-yopmail.d.ts
declare module 'easy-yopmail' {
  interface EasyYopmail {
    getMail(): Promise<string>;
    getInbox(email: string): Promise<YopmailData>;
    readMessage(email: string, emailID: string): Promise<EmailContent>;
  }

  const easyYopmail: EasyYopmail;
  export = easyYopmail;
}
