// types/easy-yopmail.d.ts
declare module 'easy-yopmail' {
    interface EasyYopmail {
      getInbox(email: string): Promise<any>;
      getMail(): Promise<any>;
    }
  
    const easyYopmail: EasyYopmail;
    export = easyYopmail;
  }
  