# @bedunkevich/atol

[![License](https://badgen.net/github/license/Bedunkevich/atol)](./LICENSE)
[![Library minified size](https://badgen.net/bundlephobia/min/atol)](https://bundlephobia.com/result?p=@bedunkevich/atol)
[![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/atol)](https://bundlephobia.com/result?p=@bedunkevich/atol)

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install @bedunkevich/atol --save

# For Yarn, use the command below.
yarn add @bedunkevich/atol
```

### Installation from CDN

This module has an UMD bundle available through JSDelivr and Unpkg CDNs.

```html
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/ajv/7.0.2/ajv7.min.js"
  integrity="sha512-FcNbhlhTHDOM2X6P+6PLsmG6iH+Z6pphlYUD1eJgRTNrHngb/DUvTYMGSd+ccaoJUVy6xto9sQjiM8KGN2mRrA=="
  crossorigin="anonymous"
></script>
<script>
  (function () {
    const Ajv = window.ajv7.default;
    const ajv = new Ajv();
  })();
</script>
<script src="https://unpkg.com/axios@0.21.1/dist/axios.min.js"></script>

<!-- For UNPKG use the code below. -->
<script src="https://unpkg.com/@bedunkevich/atol"></script>

<!-- For JSDelivr use the code below. -->
<script src="https://cdn.jsdelivr.net/npm/@bedunkevich/atol"></script>

<script>
  const Atol = atol.init({
    session: {
      taxationType: 'usnIncome',
      operator: {
        name: 'Name',
        vatin: '123',
      },
    },
  });
</script>
```

## Documentation

[Documentation generated from source files by Typedoc](./docs/README.md).

## License

Released under [MIT License](./LICENSE).
