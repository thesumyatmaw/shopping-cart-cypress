
export const getRandomGeneratedEmail = () => {

    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let randomString = '';
    //var shareEmail = '';
     
    for(var ii=0; ii<6; ii++){
        randomString += chars[Math.floor(Math.random() * chars.length)];
    }
    return `${randomString}@gmail.com`
}