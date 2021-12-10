import { IRisk } from './irisk';
import { IQuestions } from './iquestions'

/**
 * Interface Products: Product --> Agents
 */
export interface IQuote {
    risk: IRisk,
    questions?: IQuestions[]
}