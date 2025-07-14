import { ItemStatus } from '../core/surface-items';
import { ErrorResult } from '../utils/ErrorResult';
import { CommandType } from './CommandType';

export interface CommandExecutionResult {
    success: boolean;
    command?: CommandType;
    itemStatus?: ItemStatus;
    error?: ErrorResult;
}
