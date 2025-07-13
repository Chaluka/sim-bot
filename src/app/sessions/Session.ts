export interface Session {
    run(): void;
    stop(): void;
    getStatus(): string;
}
