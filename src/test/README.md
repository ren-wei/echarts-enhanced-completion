# 测试

由于完全覆盖的自动测试比较复杂，目前大部分使用手动测试，自动测试仅测试不调用`vscode`的部分。下面是测试说明：

## 测试目录的结构

```
.
├── README.md
├── runTest.ts              // 自动测试的入口文件
├── suite                   // 自动测试集
│   ├── ast.test.ts         // 测试 ast.ts 文件
│   ├── extension.test.ts   // 测试 extension.ts 文件以及全局的测试
│   ├── index.ts            // 自动测试函数
│   ├── options.test.ts     // 测试 options.ts 文件
│   └── store.test.ts       // 测试 store.ts 文件
├── example                 // 测试示例文件夹
│   ├── 00.html
│   ...
```

## 手动测试

1. `F5` 启动插件。（如果测试前已经安装最新版本的插件，则直接在文件中进行测试，用于发布后复测）
2. 将 `example` 目录下的文件内容复制到打开的编辑器中，然后按照文件中的注释进行操作
3. 对 `example` 中的每个文件都执行步骤2
