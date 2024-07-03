import Mailjs from '@cemalgnlts/mailjs';

const mailjs: Mailjs = new Mailjs();

export type mailUser = {
  username: string;
  password: string;
};

export async function mailLogin(): Promise<mailUser> {
  const user: mailUser = await createRandomAccount();
  await mailjs.login(user.username, user.password);
  console.debug(
    `Random Mail account: ${user.username} password:`,
    user.password,
  );
  return user;
}

async function createRandomAccount(): Promise<mailUser> {
  let account = { status: false, data: {} };
  for (let i = 0; i < 5; i++) {
    try {
      account = await mailjs
        .createOneAccount()
        .then((res: { status: boolean; data: object }) => {
          return res;
        });
      if (!account.status) {
        console.debug('Account creation failed. Retrying...');
        await new Promise((f) => setTimeout(f, 5000));
      } else {
        console.debug(
          'Random 3rd party mail client account- https://mail.tm/en/:',
          account.data,
        );
        break;
      }
    } catch (error) {
      console.error('An error occurred while creating the account:', error);
    }
  }
  if (account.status) {
    return account.data as mailUser;
  } else {
    throw new Error('Account creation failed!');
  }
}

async function getEmailIdViaFilter(
  user: mailUser,
  subject: string,
  seen: boolean = false,
): Promise<string> {
  await mailjs.login(user.username, user.password);
  const messages = await mailjs.getMessages();
  const filteredMessage = messages.data.find((message) => {
    return message.subject.includes(subject) && message.seen === seen;
  });

  if (filteredMessage) {
    return filteredMessage.id;
  } else {
    throw new Error(
      `Email with subject "${subject}" and seen=${seen} not found.`,
    );
  }
}

export async function getEmail(
  user: mailUser,
  subject: string,
  seen: boolean = false,
): Promise<string> {
  const messageID = await getEmailIdViaFilter(user, subject, seen);
  return await mailjs
    .getMessage(messageID)
    .then((res: { data: { text: string } }) => {
      return res.data.text;
    });
}
