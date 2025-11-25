
export interface IUserServices {
    fetchUserProfile(userId: string): Promise<userprofileresponse>;
}


type userprofileresponse = {
  id: string;
  username: string;
  email: string;
  display_name?: string;
  profile_picture?: string;
};

export type { userprofileresponse };

