import { ICoverages } from './icoverages';
import { IQuestions } from './iquestions'

/**
 * Interface Risk
 */
export interface IRisk {
    key: number,
    type: EtypeRisk,
    questions?: IQuestions[],
    coverages?: ICoverages[]
}

/**
 * Type of Risk
 */
export enum EtypeRisk {
    description = 0,
    addres = 1,
    vehicle = 2,
    insured = 3
}