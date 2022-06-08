import { IAgents } from './iagents';

/**
 * Interface Products: Product --> Agents
 */
export interface IProducts {
    key: number,
    description: string,
    agents: IAgents[]
}
