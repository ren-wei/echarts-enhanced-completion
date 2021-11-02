#${prefix} color(Color) = ${defaultColor|default('自适应')}

<ExampleUIControlColor />

柱条的颜色。{{ if: ${useColorPalatte} }} 默认从全局调色盘 [option.color](~color) 获取颜色。 {{ /if }} {{ if: ${hasInherit} }} 在`emphasis`状态中支持设置为`'inherit'`取消高亮。 {{ /if }}



#${prefix} borderColor(Color) = '#000'

<ExampleUIControlColor value="#000" />

柱条的描边颜色。

#${prefix} borderWidth(number) = 0

<ExampleUIControlNumber value="0" min="0" step="0.5" />

柱条的描边宽度，默认不描边。

#${prefix} borderType(string) = 'solid'

<ExampleUIControlEnum default="solid" options="solid,dashed,dotted" />

柱条的描边类型，默认为实线，支持 `'dashed'`, `'dotted'`。





{{ if: ${useDecal} }}
#${prefix} decal(Object)




{{ /if }}
