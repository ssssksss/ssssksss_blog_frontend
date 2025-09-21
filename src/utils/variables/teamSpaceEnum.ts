export enum TeamSpaceRoleEnum {
  BE = "BE",
  DE = "DE",
  FE = "FE",
  HR = "HR",
  MK = "MK",
  PM = "PM",
  QA = "QA",
}

export enum TeamSpacePositionEnum {
  OWNER = "OWNER",
  HEAD = "HEAD",
  MANAGER = "MANAGER",
  LEAD = "LEAD",
  SENIOR = "SENIOR",
  MID = "MID",
  JUNIOR = "JUNIOR",
  INTERN = "INTERN",
}

export function isPositionPrivileged(position?: TeamSpacePositionEnum): boolean {
  return [
    TeamSpacePositionEnum.OWNER,
    TeamSpacePositionEnum.HEAD,
    TeamSpacePositionEnum.MANAGER,
    TeamSpacePositionEnum.LEAD,
  ].includes(position as TeamSpacePositionEnum);
}
