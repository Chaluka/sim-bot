import { SessionStatus } from "./SessionStatus";

export interface Session {
    /**
     * Status of the session.
     */
    status: SessionStatus;

    /**
     * Run the current session.
     */
    run(): void;

    /**
     * Stop the current session.
     */
    stop(): void;
}
