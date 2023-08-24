import { BaseFilter, Item } from "https://deno.land/x/ddc_vim@v4.0.4/types.ts";
import {
  assertEquals,
  Denops,
} from "https://deno.land/x/ddc_vim@v4.0.4/deps.ts";

function calcScore(
  input: string,
  str: string,
  words: string[],
): number {
  const index = words.indexOf(str);
  let score = index;

  words.slice(index + 1).forEach((word, index) => {
    if (word.length > input.length + 2 && word.startsWith(str)) {
      score -= (words.length - index) / 2;
    }
  });

  return score;
}

type Params = Record<string, never>;

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    denops: Denops;
    completeStr: string;
    items: Item[];
  }): Promise<Item[]> {
    const words = args.items.map((item) => item.word);

    return Promise.resolve(args.items.sort((a, b) => {
      return calcScore(args.completeStr, a.word, words) -
        calcScore(args.completeStr, b.word, words);
    }));
  }

  override params(): Params {
    return {};
  }
}

Deno.test("calcScore", () => {
  assertEquals(calcScore("", "a", ["a", "b"]), 0);
  assertEquals(calcScore("", "a", ["a", "b", "ab"]), -2);
  assertEquals(calcScore("", "a", ["a", "b", "a"]), -2);
});
