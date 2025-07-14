import { Dimensions } from './Dimensions';
import { Surface } from './Surface';

export enum SurfaceType {
    TABLE_TOP = 'TABLE_TOP',
    CUSTOM = 'CUSTOM',
}

export interface SurfaceFactory {
    /**
     * Create {@link Surface} base on the user input
     * @param surfaceType type of the surface
     * @param dimensions width and height
     */
    create(surfaceType: SurfaceType, dimensions: Dimensions): Surface;
}
