export interface HairService {
    id: number;

    name: string;

    // Time-only data type does NOT exist in TypeScript (like TimeSpan in C#) => save it as a Date and can extract the Time.
    duration: Date;

    price: number;
}