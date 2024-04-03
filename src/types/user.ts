export interface User {
	userId: string
    email: string
    username: string
    name: string
    avatar: string
    emailIsVerified: boolean
    verified: boolean
    followers: number
    following: number
    schoolName: string;
	schoolLocation: string;
	graduationYear: string;
	degree: string;
	major: string;
	sports: string;
	clubs: string;
    createdAt: string
    updatedAt: string
    token?: string
}
