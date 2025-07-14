import { CommandExecutor } from '../../commands';
import { CommandParser } from '../../commands/CommandParser';
import { SurfaceItemFactory } from '../../core/surface-items';
import { Surface } from '../../core/surfaces';
import { SurfaceTestHelper } from './SurfaceTestHelper';

export class CommandExecutorTestHelper {
    public static createTestCommandExecutor() {
        const mockSurface: Surface = SurfaceTestHelper.createMockSurface();
        const mockSurfaceItemFactory: SurfaceItemFactory = {
            create: jest.fn(),
        };
        const mockParser: CommandParser = {
            parse: jest.fn(),
        };
        return new CommandExecutor(mockSurface, mockSurfaceItemFactory, mockParser);
    }
}
