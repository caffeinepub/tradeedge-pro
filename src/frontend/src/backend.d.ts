import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Signal {
    id: bigint;
    status: Variant_closed_active;
    pair: string;
    target: number;
    stopLoss: number;
    timestamp: bigint;
    category: Category;
    entryPrice: number;
    signalType: SignalType;
}
export interface EducationResource {
    id: bigint;
    difficultyLevel: string;
    title: string;
    duration: bigint;
    description: string;
    category: Category;
}
export interface ContactSubmission {
    id: SubmissionId;
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export type SubmissionId = bigint;
export enum Category {
    forex = "forex",
    crypto = "crypto"
}
export enum SignalType {
    buy = "buy",
    sell = "sell"
}
export enum Variant_closed_active {
    closed = "closed",
    active = "active"
}
export interface backendInterface {
    addEducationResource(title: string, description: string, category: Category, difficultyLevel: string, duration: bigint): Promise<void>;
    addSignal(pair: string, signalType: SignalType, entryPrice: number, target: number, stopLoss: number, category: Category): Promise<void>;
    getAllEducationResources(): Promise<Array<EducationResource>>;
    getAllSignals(): Promise<Array<Signal>>;
    getContactSubmissionsByEmail(email: string): Promise<Array<ContactSubmission>>;
    getSignalsByCategory(category: Category): Promise<Array<Signal>>;
    submitContactForm(name: string, email: string, subject: string, message: string): Promise<void>;
    updateEducationResource(id: bigint, title: string, description: string, category: Category, difficultyLevel: string, duration: bigint): Promise<void>;
    updateSignal(id: bigint, pair: string, signalType: SignalType, entryPrice: number, target: number, stopLoss: number, status: Variant_closed_active, category: Category): Promise<void>;
}
