import { User } from '../../types/user';
import { client } from '../common/client';
import type { DefaultResponse } from '../types';
import { type ImagePickerAsset } from 'expo-image-picker';

export interface UpdatePayload {
    username: string;
	name: string;
	password: string;
	confirmPassword: string;
    schoolName: string;
	schoolLocation: string;
	graduationYear: string;
	degree: string;
	major: string;
	gpa: string;
	gradeLevel: string;
	clubs: string;
	sports: string;
}

export interface ChangeAvatarResponse {
    avatar: string
}

export async function removeAvatar(): Promise<DefaultResponse<ChangeAvatarResponse>> {
    return client({
        url: 'users/@me/remove-avatar',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => response.data);
}

export async function update(payload: UpdatePayload): Promise<DefaultResponse<User>> {
    return client({
        url: 'users/@me/update',
        method: 'PUT',
        data: payload,
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => response.data);
}

export async function updateAvatar(image: FormData): Promise<DefaultResponse<ChangeAvatarResponse>> {
    return client({
        url: 'users/@me/update-avatar',
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: image,
        transformRequest: (data) => {
            return data;
        }
    }).then((response) => response.data);
}
