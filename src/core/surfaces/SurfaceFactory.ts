import { Dimensions } from './Dimensions';
import { Surface } from './Surface';

export enum SurfaceType {
    TABLE_TOP = 'TABLE_TOP',
    CUSTOM = 'CUSTOM',
}

export interface SurfaceFactory {
    create(surfaceType: SurfaceType, dimensions: Dimensions): Surface;
}
