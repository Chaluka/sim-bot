import { ItemStatus } from '../core/surface-items';
import { CommandType } from './CommandType';

export interface CommandExecutionResult {
    success: boolean;
    command?: CommandType;
    itemStatus?: ItemStatus;
    error?: string;
    data?: any;
}
