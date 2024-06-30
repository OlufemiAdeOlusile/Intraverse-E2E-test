import easyYopmail from 'easy-yopmail';


export const getNewEmail = async (): Promise<string> => {
    return easyYopmail.getMail().then(email => {
    console.log(email); 
    return email;
})};

export const getInbox = async (email: string) => {
    return easyYopmail.getInbox(email).then(inbox => {
        console.log(inbox);
        return inbox
    })
}