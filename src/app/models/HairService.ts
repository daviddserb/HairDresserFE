export interface HairService {
    id: number;
    name: string;
    duration: Date; //It doesn't exist with only Time (like in C# with TimeSpan), so I will save it as a Date and when I need the duration, I extract the Time.
    price: number;
}