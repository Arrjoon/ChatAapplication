export type LoginPayload={
    username:string;
    password:string;
}

export type LoginResponse={
    user:{
        id:number;
        username:string;
        email:string;
    };
}

export type RegisterPayload={
    username:string;
    email:string;
    password:string;
}

export type RegisterResponse={
    user:{
        id:number;
        username:string;
        email:string;
    };
}