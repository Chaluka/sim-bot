import { AppConfigs } from './app/AppConfigs.js';
import { CLUserInterface } from './app/io/CLUserInterface.js';
import { SimulatorApp } from './app/SimulatorApp.js';
import { CLCommandParser } from './commands/CLCommandParser.js';
import { SurfaceItemFactoryImpl } from './core/surface-items/SurfaceItemFactoryImpl.js';
import { SurfaceFactoryImpl } from './core/surfaces/SurfaceFactoryImpl.js';

const appConfigs: AppConfigs = {
    connection: 'unknown',
    sessionConfigs: {
        surfaceFactory: new SurfaceFactoryImpl(),
        surfaceItemFactory: new SurfaceItemFactoryImpl(),
        commandParser: new CLCommandParser(),
        userInterface: new CLUserInterface(), // enable verbose to get update for every move
    },
};

SimulatorApp.getInstance(appConfigs).run();
