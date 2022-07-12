// Reference:
// https://blog.scottlogic.com/2015/01/20/typescript-compiler-api.html
const utils = require('@typescript-eslint/utils')


exports.initTypeScript = function initTypeScript(context) {
  const parserServices = utils.ESLintUtils.getParserServices(context)
  const checker = parserServices.program.getTypeChecker()   // TypeScript functional
  return {
    parserServices,
    checker
  }
}


exports.isStableKnownHookValueByTS = function isStableKnownHookValueByTS(parserServices, checker, def, callee) {
  const originalNode = parserServices.esTreeNodeToTSNodeMap.get(def.name)
  const nodeType = checker.getTypeAtLocation(originalNode)
  const typeString = checker.typeToString(nodeType)

  if (/^(RefObject<|MutableRefObject<|Dispatch<SetStateAction<|Dispatch<|DispatchWithoutAction)/.test(typeString)) {
    return true
  }

  // 以 useCallback(xxx, []) useMemo(xxx, []) 的形式（第二个参数是空数组）定义的内容，视为 stable 的
  if (callee.name === 'useCallback' || callee.name === 'useMemo') {
    const deps = callee.parent.arguments[1]
    if (deps && !deps.elements.length) {
      return true
    }
  }
}
