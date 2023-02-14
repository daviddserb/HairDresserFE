export interface HairService {
    id: number;

    name: string;
    //Time only does NOT exist (like TimeSpan in C#) => save it as Date and when need the duration => extract the Time.
    duration: Date;
    price: number;
}