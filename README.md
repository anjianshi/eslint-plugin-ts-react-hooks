# eslint-plugin-ts-react-hooks

Use TypeScript to enhance `react-hooks/exhaustive-deps` rule's functional.
Auto ignore stable items from custom hook.

## Usage

In ESLint config:

```js
module.exports = [require('eslint-plugin-ts-react-hooks').configs.recommended]
```

## Example

```typescript
import React, { useCallback, useState, useReducer, useRef } from 'react

function useCustomHook() {
  const [state3, setState3] = useState(3)
  return { state3, setState3 }
}

function MyComponent({ value }: { value: number }) {
  const [state, setState] = useState(1)
  const [state2, dispatch] = useReducer((state: number, action: number) => state + action, 2)
  const ref = useRef<number|null>(null)

  const { state3, setState3 } = useCustomHook()

  const callback = useCallback(() => {
    console.log('call')
  }, [])

  useEffect(() => {
    console.log(value)
    if (typeof ref.current === 'number') {
      setState(ref.current)
      dispatch(ref.current)
      setState3(ref.current)
      callback()
    }
  }, [value])      // only 'value' need put in dependencies

  return <div>content</div>
}
```
