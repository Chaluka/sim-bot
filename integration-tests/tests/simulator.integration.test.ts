import { TestHelper } from '../helpers/TestHelper';
import tests from '../data/commands.json';

describe('simulator', () => {
    describe('positive', () => {
        test.each(tests)(
            'Running tests for args %o',
            ({ testId, commands, output }: { testId: string; commands: string[]; output: string }) => {
                // Act
                TestHelper.runTestSimulator({ testId, commands, output });
                // Assert
            }
        );
    });
});
