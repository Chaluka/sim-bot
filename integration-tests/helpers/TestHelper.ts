import { AppConfigs } from '../../src/app/AppConfigs';
import { SurfaceFactoryImpl } from '../../src/core/surfaces';
import TestUserInterface from './TestUserInterface';
import { CommandTestArgs } from './CommandTestArgs';
import { SimulatorApp } from '../../src/app/SimulatorApp';
import { CLCommandParser } from '../../src/commands';
import { SurfaceItemFactoryImpl } from '../../src/core/surface-items';

export class TestHelper {
    public static runTestSimulator(test: CommandTestArgs) {
        const appConfigs: AppConfigs = {
            connection: 'unknown',
            sessionConfigs: {
                surfaceFactory: new SurfaceFactoryImpl(),
                surfaceItemFactory: new SurfaceItemFactoryImpl(),
                commandParser: new CLCommandParser(),
                userInterface: new TestUserInterface(test), // enable verbose to get update for every move
            },
        };

        SimulatorApp.getInstance(appConfigs).run();
    }
}
