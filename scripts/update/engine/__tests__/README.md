# Engine 模块单元测试

这个目录包含了 engine 模块的完整单元测试。

## 测试文件结构

- `stack.test.ts` - Stack 类的单元测试
- `command.test.ts` - 各种 Command 类的单元测试
- `engine.test.ts` - Engine 类的单元测试
- `runTests.ts` - 测试运行器入口

## 运行测试

### 使用 yarn 脚本（推荐）

```bash
yarn test:engine
```

### 直接运行

```bash
cd scripts
node test-engine.js
```

## 测试覆盖范围

### Stack 类测试
- 基本操作（push, pop）
- top() 和 bottom() 方法
- findTop() 方法
- 继承自 Array 的方法
- 边界情况
- 类型安全

### Command 类测试

#### TextNode
- 创建和渲染
- 变量替换
- 克隆

#### TargetCommand
- 创建和命名
- 添加子节点
- 渲染结果缓存
- 命名冲突处理
- 自动关闭

#### UseCommand
- 创建和参数解析
- 渲染（目标存在/不存在）

#### ImportCommand
- 创建和渲染
- 错误处理

#### IfCommand
- 条件判断
- 真/假条件渲染
- 复杂条件

#### ElifCommand / ElseCommand
- 创建
- 自动关闭

#### BlockCommand
- 创建和子节点管理
- 自动关闭

#### ForCommand
- 创建和语法验证
- 自动关闭
- **注意**: 由于设计问题，`for` 命令的完整功能测试被跳过。变量语法 `${item}` 与模板引擎的命令结束符 `}}` 有冲突。

#### VarCommand
- 变量定义
- 表达式求值
- 字符串值

### Engine 类测试

#### 构造函数
- 默认选项
- 自定义选项
- 命令扩展

#### parseSource
- 简单文本解析
- 多目标解析
- 嵌套命令
- 注释处理
- 各种命令类型

#### render
- 简单渲染
- 变量渲染
- 默认值
- 错误处理
- 结果缓存

#### compile
- 变量编译
- 嵌套属性
- 默认值（各种类型）
- 字符串连接

#### parseString
- 字符串解析
- 变量替换
- 特殊字符处理

#### 选项测试
- namingConflict（命名冲突处理）
- missTarget（缺失目标处理）

#### 依赖管理
- 依赖跟踪
- 依赖解析

#### 复杂场景
- 嵌套 if 语句
- if-elif-else 链
- 变量定义和使用
- use/import 命令

#### 边界情况
- 空目标
- 特殊字符
- Unicode 字符
- 长文本
- 深层嵌套

## 跳过的测试

有 9 个测试被标记为 `skip`，原因是 `for` 命令的语法设计与模板引擎的命令结束符有冲突：

- `for` 命令使用 `${items} as ${item}` 的语法
- 模板引擎使用 `{{` 和 `}}` 作为命令分隔符
- `${item}` 中的 `}` 会被误认为是命令结束的一部分

这是一个已知的设计问题，需要在未来的版本中解决。

## 添加新测试

要添加新的测试，请在相应的测试文件中添加 `it()` 或 `describe()` 块：

```typescript
describe('New Feature', () => {
    it('should do something', () => {
        // 测试代码
    });
});
```

## 技术细节

- 使用 Mocha 作为测试框架
- 使用 Node.js 的 assert 模块进行断言
- 使用 ts-node 直接运行 TypeScript 测试文件（无需编译）
- 测试运行器会处理运行流程

## 为什么使用 ts-node？

之前使用 `tsc` 编译 TypeScript 文件会生成 .js 和 .js.map 文件，造成文件污染。现在改用 `ts-node` 直接运行 TypeScript 文件，避免了中间文件的生成，保持代码库整洁。
