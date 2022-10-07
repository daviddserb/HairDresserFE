export interface HairService {
    id: number;
    name: string;
    duration: Date; // Nu exista doar Time, astfel salvez sub forma de Date si cand trebuie sa lucrez cu time-ul, il extrag cu ceva metoda.
    price: number;
}