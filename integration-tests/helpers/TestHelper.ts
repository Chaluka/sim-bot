import { AppConfigs } from '../../src/app/AppConfigs';
import { Dimensions, SurfaceType } from '../../src/core/surfaces';
import TestUserInterface from './TestUserInterface';
import { CommandTestArgs } from './CommandTestArgs';
import { SimulatorApp } from '../../src/app/SimulatorApp';

export class TestHelper {
    public static runTestSimulator(test: CommandTestArgs) {
        const appConfigs: AppConfigs = {
            surfaceType: SurfaceType.TABLE_TOP,
            dimensions: new Dimensions(5, 5),
            userInterface: new TestUserInterface(test),
        };

        SimulatorApp.getInstance(appConfigs).run();
    }
}
