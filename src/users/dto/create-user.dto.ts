import { Location } from "src/common/interface/locations";
import { Role } from "src/roles/entities/role.entity";

export class CreateUserDto {
    email: string;
    photoURL: string;
    emailVerified: boolean;
    firebase: object;
    uid: string;
    displayName: string;
    locations?: Location[];
    role: Role;
}
