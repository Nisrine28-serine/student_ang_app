export interface CandidacyCard {
    idNum: number;
    yearCode: string;
    divisionCode: string;
    stage: string;
    programCode: string;
    termCode: string;
    bacYear: string;
    highSchool: string;
    highSchoolDiploma: string;
    highSchoolDistinction: string;
    hsOrgTypeAd: string;
    gpa: number;
    totalApCredits: number;
    totalInstCredits: number;
    clOrgTypeAd: string | null;
    clGpa: number | null;
    clTotalApCredits: number | null;
    clTotalInstCredits: number | null;
    schoolType: string | null;
    udef1a1: string;
    act: string | null;
    gat: string | null;
    gre: string | null;
    sat: string | null;
    satRc: string | null;
    satWc: string | null;
    tef: string | null;
    toepp: string | null;
    birthDate: string;
    citizenOf: string;
    city: string;
    country: string;
    addressLine1: string;
    birthName: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    gender: string;
    mobile: string;
    fatherAddress: string | null;
    motherAddress: string | null;
    fatherPhone: string | null;
    motherPhone: string | null;
    fatherOccupation: string | null;
    motherOccupation: string | null;
    appFeeDate: string;
  }