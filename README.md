# Wizardry IV Magic Word Codes

A browser-based calculator for the magic word list game codes in *Wizardry IV — Return of Werdna*.

The original 8,000-entry table was compressed into three 20-entry lookup maps. Choose one code from each column and the calculator returns the corresponding four-digit magic word.

The algorithm was documented by Bob Colbert in *The Computist*, Issue #51, January 1988, page 36. [Read the issue on the Internet Archive](https://archive.org/details/computist-scan-51).

## Test

The automated test covers all 8,000 possible input combinations and compares the complete output sequence with the supplied reference data.

```sh
npm test
```

## Run locally

Serve the directory with any static web server, for example:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
