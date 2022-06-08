/**
 * Interface Questions: Policy - Risk - Coverages - Clauses
 */
export interface IQuestions {
    key: string,
    type: string,
    min?: number,
    max?: number,
    minLength?: number,
    maxLength?: number,
    order: number,
    label: string,
    value?: string,
    required?: boolean,
    options?: OptionsQuestion[]
}

/**
 * Options of question (DropDown)
 */
export interface OptionsQuestion {
    key: string,
    value: string
}