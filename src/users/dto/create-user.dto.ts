import { Location } from "src/common/interface/locations";

export class CreateUserDto {
    email: string;
    photoURL: string;
    emailVerified: boolean;
    firebase: object;
    uid: string;
    displayName: string;
    locations?: Location[]
}
