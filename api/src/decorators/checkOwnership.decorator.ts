import { SetMetadata } from "@nestjs/common";

import { CheckOwnershipInfo } from "../types/checkOwnershipInfo.interface";

export const CHECK_OWNERSHIP_KEY = "check_ownership";

export const CheckOwnership = (info: CheckOwnershipInfo) => SetMetadata(CHECK_OWNERSHIP_KEY, info);
