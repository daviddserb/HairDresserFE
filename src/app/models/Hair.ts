export interface Hair {
    id: number;
    name: string;
    //Time-only does NOT exist in TypeScript (like TimeSpan in C#) => save it as a Date and when need the duration => extract the Time.
    duration: Date;
    price: number;
}