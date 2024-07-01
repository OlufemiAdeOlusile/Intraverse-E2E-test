import easyYopmail from 'easy-yopmail';


export const getNewEmail = async (): Promise<string> => {
    return easyYopmail.getMail().then(email => {
    return email;
})};

export const getInboxId = async (email: string, subject: string): Promise<string | undefined> => {
    try {
      const inbox: YopmailData = await easyYopmail.getInbox(email);
      const emailItem: Email = inbox.inbox.find(f => f.subject.includes(subject));
      return emailItem?.id;
    } catch (error) {
      console.error('Error fetching inbox:', error);
      return undefined;
    }
  };

  export const getMessageText = async (email: string, emailID: string): Promise<string | undefined> => {
    try {
      const message: EmailContent = await easyYopmail.readMessage(email, emailID);
      console.log(message.content);
      return message.content;
    } catch (error) {
      console.error('Error fetching Message:', error);
      return undefined;
    }
  };

