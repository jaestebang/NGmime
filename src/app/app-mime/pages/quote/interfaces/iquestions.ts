/**
 * Interface Questions: Policy - Risk - Coverages - Clauses
 */
export interface Iquestions {
    key: string,
    type: string,
    length?: number,
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