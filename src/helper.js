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


exports.isStableKnownHookValueByTS = function isStableKnownHookValueByTS(parserServices, checker, def) {
  const originalNode = parserServices.esTreeNodeToTSNodeMap.get(def.name)
  const nodeType = checker.getTypeAtLocation(originalNode)
  const typeString = checker.typeToString(nodeType)

  if (/^(RefObject|MutableRefObject|Dispatch<SetStateAction|Dispatch)\</.test(typeString)) {
    return true
  }
}
