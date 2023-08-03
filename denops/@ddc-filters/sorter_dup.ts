import {
  BaseFilter,
  Item,
  DdcOptions,
} from "https://deno.land/x/ddc_vim@v3.9.2/types.ts";
import {
  assertEquals,
  Denops,
  fn,
  op,
} from "https://deno.land/x/ddc_vim@v3.9.2/deps.ts";

function calcScore(
  str: string,
  words: string[],
): number {
  const index = words.indexOf(str);
  let score = index;

  const nextIndex = words.indexOf(str, index + 1);
  if (nextIndex > 0) {
    score -= nextIndex;
  }

  return score;
}

type Params = Record<never, never>;

export class Filter extends BaseFilter<Params> {
  override async filter(args: {
    denops: Denops;
    completeStr: string;
    items: Item[];
  }): Promise<Item[]> {
    const words = args.items.map((item) => item.word);

    return Promise.resolve(args.items.sort((a, b) => {
      return calcScore(b.word, words) - calcScore(a.word, words);
    }));
  }

  override params(): Params { return {}; }
}

Deno.test("calcScore", () => {
  assertEquals(calcScore("a", ["a", "b"]), 0);
  assertEquals(calcScore("a", ["a", "b", "a"]), -2);
});
