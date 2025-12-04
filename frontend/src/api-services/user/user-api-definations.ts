
export interface IUserServices {
    fetchUserProfile(userId: string): Promise<userprofileresponse>;
    fetchUsers(): Promise<userprofileresponse[]>;
}


type userprofileresponse = {
  id: string;
  username: string;
  display_name?: string;
  profile_picture?: string|File;
};

export type { userprofileresponse };

