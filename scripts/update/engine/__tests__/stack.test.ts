import * as assert from 'assert';
import { Stack } from '../stack';

describe('Stack', () => {
    let stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack<number>();
    });

    describe('Basic operations', () => {
        it('should create empty stack', () => {
            assert.strictEqual(stack.length, 0);
        });

        it('should push elements', () => {
            stack.push(1);
            stack.push(2);
            stack.push(3);
            assert.strictEqual(stack.length, 3);
        });

        it('should pop elements', () => {
            stack.push(1);
            stack.push(2);
            const popped = stack.pop();
            assert.strictEqual(popped, 2);
            assert.strictEqual(stack.length, 1);
        });

        it('should return undefined when popping empty stack', () => {
            const popped = stack.pop();
            assert.strictEqual(popped, undefined);
        });
    });

    describe('top()', () => {
        it('should return top element', () => {
            stack.push(1);
            stack.push(2);
            stack.push(3);
            assert.strictEqual(stack.top(), 3);
        });

        it('should return undefined for empty stack', () => {
            assert.strictEqual(stack.top(), undefined);
        });

        it('should not modify stack when calling top', () => {
            stack.push(1);
            stack.push(2);
            stack.top();
            assert.strictEqual(stack.length, 2);
        });
    });

    describe('bottom()', () => {
        it('should return bottom element', () => {
            stack.push(1);
            stack.push(2);
            stack.push(3);
            assert.strictEqual(stack.bottom(), 1);
        });

        it('should return undefined for empty stack', () => {
            assert.strictEqual(stack.bottom(), undefined);
        });

        it('should not modify stack when calling bottom', () => {
            stack.push(1);
            stack.push(2);
            stack.bottom();
            assert.strictEqual(stack.length, 2);
        });
    });

    describe('findTop()', () => {
        it('should find element from top', () => {
            stack.push(1);
            stack.push(2);
            stack.push(3);
            const found = stack.findTop((x) => x === 2);
            assert.strictEqual(found, 2);
        });

        it('should return null when not found', () => {
            stack.push(1);
            stack.push(2);
            stack.push(3);
            const found = stack.findTop((x) => x === 5);
            assert.strictEqual(found, null);
        });

        it('should return topmost match', () => {
            stack.push(1);
            stack.push(2);
            stack.push(1);
            const found = stack.findTop((x) => x === 1);
            assert.strictEqual(found, 1);
            // Should be the topmost 1, not the bottom one
            // Note: findTop returns the value, not the index
            // The topmost 1 is at index 2
            const topIndex = stack.lastIndexOf(found!);
            assert.strictEqual(topIndex, 2);
        });

        it('should return null for empty stack', () => {
            const found = stack.findTop((x) => x === 1);
            assert.strictEqual(found, null);
        });

        it('should work with complex condition', () => {
            stack.push(1);
            stack.push(2);
            stack.push(3);
            stack.push(4);
            stack.push(5);
            const found = stack.findTop((x) => x > 3);
            assert.strictEqual(found, 5);
        });
    });

    describe('Inheritance from Array', () => {
        it('should support array methods', () => {
            stack.push(1);
            stack.push(2);
            stack.push(3);

            // Test map - returns a new array, not a Stack
            const mapped = stack.map((x) => x * 2);
            assert.deepStrictEqual(Array.from(mapped), [2, 4, 6]);

            // Test filter - returns a new array, not a Stack
            const filtered = stack.filter((x) => x > 1);
            assert.deepStrictEqual(Array.from(filtered), [2, 3]);

            // Test forEach
            let sum = 0;
            stack.forEach((x) => (sum += x));
            assert.strictEqual(sum, 6);
        });

        it('should support index access', () => {
            stack.push(10);
            stack.push(20);
            stack.push(30);
            assert.strictEqual(stack[0], 10);
            assert.strictEqual(stack[1], 20);
            assert.strictEqual(stack[2], 30);
        });

        it('should support iteration', () => {
            stack.push(1);
            stack.push(2);
            stack.push(3);
            const items: number[] = [];
            for (const item of stack) {
                items.push(item);
            }
            assert.deepStrictEqual(items, [1, 2, 3]);
        });
    });

    describe('Edge cases', () => {
        it('should handle single element', () => {
            stack.push(42);
            assert.strictEqual(stack.top(), 42);
            assert.strictEqual(stack.bottom(), 42);
            assert.strictEqual(stack.findTop((x) => x === 42), 42);
        });

        it('should handle large stack', () => {
            for (let i = 0; i < 1000; i++) {
                stack.push(i);
            }
            assert.strictEqual(stack.length, 1000);
            assert.strictEqual(stack.top(), 999);
            assert.strictEqual(stack.bottom(), 0);
        });

        it('should handle mixed operations', () => {
            stack.push(1);
            stack.push(2);
            stack.pop();
            stack.push(3);
            stack.push(4);
            stack.pop();

            assert.strictEqual(stack.length, 2);
            assert.strictEqual(stack.top(), 3);
            assert.strictEqual(stack.bottom(), 1);
        });

        it('should handle findTop with always false condition', () => {
            for (let i = 0; i < 100; i++) {
                stack.push(i);
            }
            const found = stack.findTop(() => false);
            assert.strictEqual(found, null);
        });

        it('should handle findTop with always true condition', () => {
            for (let i = 0; i < 100; i++) {
                stack.push(i);
            }
            const found = stack.findTop(() => true);
            assert.strictEqual(found, 99);
        });
    });

    describe('Type safety', () => {
        it('should work with string type', () => {
            const stringStack = new Stack<string>();
            stringStack.push('hello');
            stringStack.push('world');
            assert.strictEqual(stringStack.top(), 'world');
            assert.strictEqual(stringStack.findTop((s) => s.startsWith('h')), 'hello');
        });

        it('should work with object type', () => {
            interface Item {
                id: number;
                name: string;
            }
            const objectStack = new Stack<Item>();
            objectStack.push({ id: 1, name: 'first' });
            objectStack.push({ id: 2, name: 'second' });
            objectStack.push({ id: 3, name: 'third' });

            const found = objectStack.findTop((item) => item.id === 2);
            assert.deepStrictEqual(found, { id: 2, name: 'second' });
        });
    });
});
