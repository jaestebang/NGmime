import { IQuestions } from './iquestions'

/**
 * Interface Coverages
 */
export interface ICoverages {
    key: number,
    description: string,
    capital?: number,
    capitalopts?: OptionsCapitals,
    initdate?: Date,
    finaldate?: Date,
    required?: boolean,
    selected?: boolean,
    readonly?: boolean,
    questions?: IQuestions[],
    coverages?: ICoverages[]
}

/**
 * Options of capitals (DropDown)
 */
export interface OptionsCapitals {
    key: string,
    value: string
}