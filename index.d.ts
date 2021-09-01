interface AstNode {
	type: string;
	name: string;
	start: number;
	end: number;
	properties: [AstNode];
	elements: [AstNode];
	key: AstNode;
	value: AstNode;
}

type Key = 'type' | 'start' | 'end' | 'properties' | 'elements' | 'key' | 'value';

interface RecordItem {
	key: string;
	index: number | null;
}

interface TypeMsg {
	type: string;
	isObject: boolean;
	isArray: boolean;
	prop: string;
	default: string;
	children?: TypeMsg[];
}

interface BaseOptions {
	code: string;
	name: string;
	title: string;
}

interface UiControl {
	type: string | string[];
	default?: string
	options?: string;
	min?: string;
	max?: string;
	step?: string;
	dims?: string;
}

interface DescMsg {
	desc: string;
	exampleBaseOptions?: BaseOptions[];
	uiControl?: UiControl;
}

interface DescMsgObject {
	[propName: string]: DescMsg;
}

interface PathMsg {
	name: string;
	target: AstNode
}

interface KeyFunc {
	[propName: string]: Function;
}
