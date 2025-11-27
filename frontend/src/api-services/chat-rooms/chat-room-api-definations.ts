
export interface IChatRoomApiServices {
    fetchChatRoomsList(name:string): Promise<TChatRoomListResponse>;
    fetchChatRoomDetails(roomId: number): Promise<any>;
    createChatRoom(req:FormData): Promise<TCreateChatRoomPayload>;
}


export type TLastMessage = {
    id: number;
    content: string;
    sender: string;
    timestamp: string;
} | null;



export type TChatRoomResponse = {
    id: number;
    name: string;
    participants: any[];
    is_group:boolean;
    created_at: string;
    updated_at: string;
    last_message: TLastMessage;
    unread_count:number;

};

export type TChatRoomListResponse = TChatRoomResponse[];

export type TCreateChatRoomPayload = {
    name: string;
    participants: any[];
    is_group:boolean;
    picture: File | string;
};