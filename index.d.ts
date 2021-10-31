interface AstNode {
    type: string;
    name: string;
    start: number;
    end: number;
    properties: [AstNode];
    elements: [AstNode];
    key: AstNode;
    value: AstNode;
    raw: string;
}

type Key = 'type' | 'start' | 'end' | 'properties' | 'elements' | 'key' | 'value';

type Paths = Array<string | SimpleObject>;

interface TypeMsg {
    type: string;
    isObject: boolean;
    isArray: boolean;
    prop: string;
    default: string;
    children?: TypeMsg[];
}

interface RequiredRule {
    key: string;
    value: string;
    valueRegExp: string; 
}

interface UiControl {
    type: string | string[];
    default?: string;
    options?: string;
    min?: string;
    max?: string;
    step?: string;
    dims?: string;
    required?: Array<RequiredRule>;
    detailFileName?: string;
}

interface DescMsg {
    desc: string;
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

interface SimpleObject {
    [propName: string]: string | number | boolean;
}

interface BaseOption {
    title: string;
    name: string;
    imgSrc: string;
    code: string;
}

type Languages = 'en' | 'zh';
