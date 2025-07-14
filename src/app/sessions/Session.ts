export interface Session {
    status: string;
    run(): void;
    stop(): void;
}
