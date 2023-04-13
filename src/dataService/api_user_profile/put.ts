import axios from "axios";

export type IUpdateUserProfileData = {
    password: string
};

export type IUpdateUserProfileDataBody = {
    result: true;
};

type IProp = { data: IUpdateUserProfileData };

export async function updateUserProfile({
    data,
}: IProp): Promise<IUpdateUserProfileDataBody> {
    const getToken = Reflect.get(JSON.parse(localStorage.getItem('auth')), 'token');
    await axios.put(`${process.env.REACT_APP_URL}/api/user/profile`,
        {
            password: data.password
        }
        , {
            headers: {
                Authorization: `Bearer ${getToken}`,
            }
        },
    );
    return Promise.resolve({ result: true });
}
