# detokenize.js
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
