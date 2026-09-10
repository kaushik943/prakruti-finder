import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QuizResult {
    pittaPercentage: number;
    dominantDosha: string;
    vataPercentage: number;
    kaphaPercentage: number;
}
export interface Question {
    optionPitta: string;
    questionText: string;
    optionKapha: string;
    optionVata: string;
    category: string;
}
export interface backendInterface {
    addQuestion(category: string, questionText: string, optionVata: string, optionPitta: string, optionKapha: string): Promise<void>;
    calculatePrakruti(answers: Array<bigint>): Promise<QuizResult>;
    getQuestions(): Promise<Array<Question>>;
}
