// types/easy-yopmail.d.ts
declare module 'easy-yopmail' {
    interface EasyYopmail {
      getMail():Promise<any>;
      getInbox(email: string): Promise<any>;
      readMessage(email: string, emailID: string): Promise<any>;
    }
  
    const easyYopmail: EasyYopmail;
    export = easyYopmail;
  }
  