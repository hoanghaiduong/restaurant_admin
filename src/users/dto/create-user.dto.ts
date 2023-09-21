export class CreateUserDto {
    email: string;
    photoURL: string;
    emailVerified: boolean;
    firebase: object;
    uid: string;
    displayName: string;
}
