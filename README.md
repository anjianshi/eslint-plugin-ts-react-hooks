# eslint-plugin-ts-react-hooks

Use TypeScript to enhance `react-hooks/exhaustive-deps` rule's functional.
Auto ignore stable items from custom hook.

## Usage

In ESLint config:

```js
[
  require('eslint-plugin-ts-react-hooks').configs.recommended,
  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx']
    parserOptions: { sourceType: 'module', project: './tsconfig.json' },
  }
]
```

## Example

```typescript
import React, { useCallback, useState, useReducer, useRef } from 'react

function useCustomHook() {
  const [state3, setState3] = useState(3)
  return { state3, setState3 }
}

function MyComponent() {
  const [state, setState] = useState(1)
  const [state2, dispatch] = useReducer((state: number, action: number) => state + action, 2)
  const ref = useRef<number|null>(null)

  const { state3, setState3 } = useCustomHook()

  const callback = useCallback(() => {
    console.log('call')
  }, [])

  useEffect(() => {
    if (typeof ref.current === 'number') {
      setState(ref.current)
      dispatch(ref.current)
      setState3(ref.current)
      callback()
    }
  }, [callback])      // only 'callback' need put in dependencies

  return <div>content</div>
}
```
