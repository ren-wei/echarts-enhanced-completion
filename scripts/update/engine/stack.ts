export class Stack<T> extends Array<T> {
    /** 获取顶部元素 */
    public top(): T {
        return this[this.length - 1];
    }

    /** 获取底部元素 */
    public bottom(): T {
        return this[0];
    }

    /** 从顶部向下找符合条件的元素 */
    public findTop(condition: (value: T) => boolean): T | null {
        let index = this.length;
        while (index--) {
            const item = this[index];
            if (condition(item)) {
                return item;
            }
        }
        return null;
    }
}
