import { calculateMagicWord, codeMaps, formatCode } from "./codes.js";

const form = document.querySelector("#code-form");
const selects = codeMaps.map((entries, index) => {
  const select = document.querySelector(`#code-${index + 1}`);
  for (const [key] of entries) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = key;
    select.append(option);
  }
  return select;
});

const resultCode = document.querySelector("#result-code");
const resultDetail = document.querySelector("#result-detail");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const keys = selects.map((select) => select.value);
  const lookups = keys.map((key, index) =>
    codeMaps[index].find(([candidate]) => candidate === key)[1],
  );
  const result = calculateMagicWord(keys);

  resultCode.textContent = formatCode(result);
  resultDetail.textContent = `${lookups.map(formatCode).join(" + ")} → ${formatCode(result)}`;
});
