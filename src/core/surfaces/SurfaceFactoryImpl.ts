import { Dimensions } from './Dimensions';
import { Surface } from './Surface';
import { SurfaceFactory, SurfaceType } from './SurfaceFactory';
import { TableTop } from './TableTop';

export class SurfaceFactoryImpl implements SurfaceFactory {
    create(surfaceType: SurfaceType, dimensions: Dimensions): Surface {
        switch (surfaceType) {
            case SurfaceType.TABLE_TOP:
                return new TableTop(dimensions);

            default:
                throw new Error(`Unknown surface type: ${surfaceType}`);
        }
    }
}
