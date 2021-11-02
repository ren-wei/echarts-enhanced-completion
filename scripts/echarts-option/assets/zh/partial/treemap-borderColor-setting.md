**矩形边框（border）/缝隙（gap）设置如何避免混淆**

如果统一用一种颜色设置矩形的缝隙（gap），那么当不同层级的矩形同时展示时可能会出现混淆。

参见 [例子](${galleryEditorPath}doc-example/treemap-borderColor&edit=1&reset=1)，注意其中红色的区块中的子矩形其实是更深层级，和其他用白色缝隙区分的矩形不是在一个层级。所以，红色区块中矩形的分割线的颜色，我们在 `borderColorSaturation` 中设置为『加了饱和度变化的红颜色』，以示区别。
