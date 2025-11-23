
export interface IChatRoomApiServices {
    fetchChatRoomsList(): Promise<TChatRoomListResponse>;
    fetchChatRoomDetails(roomId: number): Promise<any>;
    createChatRoom(name: string, members: number[]): Promise<any>;
}


export type TChatRoomResponse = {
    id: number;
    name: string;
    participants: any[];
    is_group:boolean;
    createdat: string;
    updatedat: string;
};

export type TChatRoomListResponse = TChatRoomResponse[];

export type TCreateChatRoomPayload = {
    name: string;
    participants: any[];
    is_group:boolean;
};