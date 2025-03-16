import { CandidacyCard } from "./candidacyCard";
import { InfoCard } from "./infoCard";
import { StudentCard } from "./studentCard";

export interface Data {
    info: InfoCard;
    candiday?: CandidacyCard[];
    student: StudentCard;
}