import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { calculateMagicWord, codeMaps, formatCode } from "../codes.js";

test("all three code lists are sorted and complete", () => {
  assert.deepEqual(codeMaps.map((map) => map.length), [20, 20, 20]);
  for (const map of codeMaps) {
    const keys = map.map(([key]) => key);
    assert.deepEqual(keys, [...keys].sort());
    assert.equal(new Set(keys).size, 20);
  }
});

test("all 8,000 results match the supplied reference set", () => {
  const cases = [];
  for (const [first] of codeMaps[0]) {
    for (const [second] of codeMaps[1]) {
      for (const [third] of codeMaps[2]) {
        const result = calculateMagicWord([first, second, third]);
        assert.ok(result >= 1000 && result <= 9999);
        cases.push(`${first} ${second} ${third} ${formatCode(result)}`);
      }
    }
  }

  assert.equal(cases.length, 8000);
  assert.equal(
    createHash("sha256").update(`${cases.join("\n")}\n`).digest("hex"),
    "dcdbc35a4eedbfd65d6d65aeb83316a6975c3bd1e4c65494c87e3d0f3ae3c085",
  );
});

test("the repeated 9,000 reduction is applied", () => {
  assert.equal(calculateMagicWord(["1080", "1086", "1282"]), 8281);
  assert.equal(calculateMagicWord(["3852", "3868", "3996"]), 8592);
  assert.equal(formatCode(0), "0000");
});
