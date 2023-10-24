import { OmitType, PartialType } from "@nestjs/swagger";
import { UpdateUserDto } from "./update-user.dto";

export class UpdateUserByAdminDto extends PartialType(
    OmitType(UpdateUserDto, ['roleId'])
) {

}