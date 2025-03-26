const exp = {
    /** 单引号 */
    singleQuotation: "(?:'[^']*')",
    /** 双引号 */
    doubleQuotation: '(?:"[^"]*")',
    /** true、false等字面量值 */
    literal: '(?:true|false|null)',
    /** 数字 */
    digital: '(?:\\d+)',
    /** 形如 ${name} 或者 ${name|default('xxx')} 的模板变量值 */
    template: "(?:\\$\\{\\w+(?:\\|default\\(['\"][^']*['\"]\\))?\\})",
};

/** 带有默认值的模板表达式 */
export const templateExpWithDefault = "(?:\\$\\{(\\w+)(?:\\|default\\((['\"][^']*['\"])\\))\\})";

/** 匹配所有的简单值 */
export const valueExp = '(?:' + Object.values(exp).join('|') + ')';

/** 匹配?号表达式 */
export const questionExp = '(?:' + valueExp + '\\s*\\?\\s*' + valueExp + '\\s*:\\s*' + valueExp + ')';

const simpleExp = '(?:(?:\\((?:' + questionExp + '|' + valueExp + ')\\))|(?:' + questionExp + '|' + valueExp + '))';
/** 匹配所有表达式 */
export const expression = '(?:' + simpleExp + '(?:\\s*\\+\\s*' + simpleExp + ')*)';

export default exp;
