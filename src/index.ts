import { AppConfigs } from './app/AppConfigs.js';
import { CLUserInterface } from './app/io/CLUserInterface.js';
import { SimulatorApp } from './app/SimulatorApp.js';
import { Dimensions } from './core/surfaces/Dimensions.js';
import { SurfaceType } from './core/surfaces/SurfaceFactory.js';

const appConfigs: AppConfigs = {
    surfaceType: SurfaceType.TABLE_TOP,
    dimensions: new Dimensions(5, 5),
    userInterface: new CLUserInterface(),
};

SimulatorApp.getInstance(appConfigs).run();
