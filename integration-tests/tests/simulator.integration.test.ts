import { TestHelper } from '../helpers/TestHelper';
import positiveTests from '../data/commandsForPositiveTests.json';
import negativeTest from '../data/commandsForNegativeTests.json';

describe('simulator', () => {
    describe('positive', () => {
        test.each(positiveTests)(
            'Running tests for args %o',
            ({ testId, commands, output }: { testId: string; commands: string[]; output: string }) => {
                // Act & Assert
                TestHelper.runTestSimulator({ testId, commands, output });
            }
        );
    });

    describe('negative', () => {
        test.each(negativeTest)(
            'Running tests for args %o',
            ({ testId, commands, output }: { testId: string; commands: string[]; output: string }) => {
                // Act & Assert
                TestHelper.runTestSimulator({ testId, commands, output });
            }
        );
    });
});
