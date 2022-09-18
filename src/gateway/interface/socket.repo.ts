
export default interface ISocketRepository {

    getTheSocketId(userId: string);
    createOrUpdateTheUserSocketInformation(userId: string, socketId: string, isActive: boolean,);

}