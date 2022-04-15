# detokenize.js
Part of <a href="https://lango-corner.com" target="_blank">LangoCorner</a>.

Joins tokens into a sentence. Supports English and Russian.

```ts
import { detokenizeSentence } from 'detokenize-js';

detokenizeSentence([
  `and`,
  `I`,
  `'m`,
  `tellin'`,
  `'em`,
  `"`,
  `I`,
  `don`,
  `'t`,
  `need`,
  `50`,
  `%`,
  `"`
]) // -> `And I'm tellin' 'em "I don't need 50%".`
```

Pass 'en' or 'ru' as a second argument to define the language explicitly.

MIT License.
