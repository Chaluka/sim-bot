import { SimulatorApp } from './app/SimulatorApp.js';
import { Dimensions } from './core/surfaces/Dimensions.js';
import { SurfaceType } from './core/surfaces/SurfaceFactory.js';

const appConfigs = {
    surfaceType: SurfaceType.TABLE_TOP,
    dimensions: new Dimensions(5, 5),
};
SimulatorApp.getInstance(appConfigs).run();
