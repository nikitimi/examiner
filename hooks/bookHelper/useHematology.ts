import hematology1 from "@/lib/books/hematology/1.json";
import hematology2 from "@/lib/books/hematology/2.json";
import hematology3 from "@/lib/books/hematology/3.json";
import hematology4 from "@/lib/books/hematology/4.json";
import hematology5 from "@/lib/books/hematology/5.json";
import hematology6 from "@/lib/books/hematology/6.json";
import hematology7 from "@/lib/books/hematology/7.json";
import hematology8 from "@/lib/books/hematology/8.json";
import type { Book } from "@/lib/utils/schema/book";

export function useHematology() {
  return [
    hematology1 as Book,
    hematology2 as Book,
    hematology3 as Book,
    hematology4 as Book,
    // TODO: Fix type inference,
    // temporary solution.
    //             vvvvvvv
    hematology5 as unknown as Book,
    hematology6 as Book,
    hematology7 as Book,
    hematology8 as Book,
  ];
}
