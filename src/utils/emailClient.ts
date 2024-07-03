import easyYopmail from 'easy-yopmail';

export const getNewEmail = async (): Promise<string> => {
  return easyYopmail.getMail().then((email) => {
    return email;
  });
};

export const getInboxId = async (
  email: string,
  subject: string,
): Promise<string | undefined> => {
    const inbox: YopmailData = await easyYopmail.getInbox(email);
    const emailItem: Email = inbox.inbox.find((f: Email) =>
      f.subject.includes(subject),
    );
    console.log(emailItem)
    return emailItem?.id;
};

export const getMessageText = async (
  email: string,
  emailID: string,
): Promise<string | undefined> => {
    const message: EmailContent = await easyYopmail.readMessage(email, emailID);
    console.log(message.content);
    return message.content;
};
