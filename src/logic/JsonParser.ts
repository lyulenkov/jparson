import {ObjectParser} from "./ObjectParser";

export class JsonParser {

    /**
     * @throws Error
     */
    static parse(json: string): ParsedJSONNode {
        let value = JSON.parse(json);
        if (value && typeof value === JsonTypes.OBJECT) {
            if (value instanceof Array) {
                return this.parseArray(value);
            }
            return this.parseObject(value);
        }
        return this.parsePrimitive(value);
    }

    static parseObject(object: object, prop?: string): ParsedJSONNode {
        let node = new ParsedJSONNode({
            prop,
            type: JsonTypes.OBJECT,
            postfix: BraceChar.CURLY_OPENING
        });
        ObjectParser.walk(object,(prop, value, parentProps) => {
            if (value instanceof Array) {
                node.children.push(this.parseArray(value, prop));
            } else {
                node.children.push(this.parsePrimitive(value, prop));
            }
        });
        node.closingLine = new ParsedJSONNode({
            postfix: BraceChar.CURLY_CLOSING
        });
        return node;
    }

    static parseArray(array: any[], prop?: string): ParsedJSONNode {
        let node = new ParsedJSONNode({
            prop: this.normalizePropName(prop),
            postfix: BraceChar.SQUARE_OPENING
        });
        array.forEach(value => {
            if (typeof value == JsonTypes.OBJECT) {
                node.children.push(this.parseObject(value));
                return;
            }
            node.children.push(this.parsePrimitive(value));
        });
        node.closingLine = new ParsedJSONNode({
            postfix: BraceChar.SQUARE_CLOSING
        });
        return node;
    }

    static parsePrimitive(value: any, prop?: string): ParsedJSONNode {
        let type: string = typeof value;
        if (type == JsonTypes.STRING) {
            value = `"${value}"`;
        }
        if (value == null) {
            value = 'null';
            type = JsonTypes.NULL;
        } else {
            value = '' + value;
        }
        return new ParsedJSONNode({
            prop: this.normalizePropName(prop),
            value: value,
            type: type
        });
    }

    static normalizePropName(prop: string): string {
        if (prop && prop.includes(' ')) {
            return `"${prop}"`;
        }
        return prop;
    }
}

type ParsedJSONLine = {
    prop?: string,
    value?: string,
    type?: string,
    postfix?: string,
    rejectedByFilters?: Set<string>
};

export class ParsedJSONNode {
    children: ParsedJSONNode[] = [];
    private _closingLine: ParsedJSONNode;

    constructor(readonly value: ParsedJSONLine) {}

    hasChildren() {
        return this.children.length;
    }

    set closingLine(line: ParsedJSONNode) {
        this._closingLine = line;
    }

    get closingLine() {
        return this._closingLine;
    }

    isFilteredOut() {
        return this.value.rejectedByFilters?.size;
    }
}

enum JsonTypes {
    BOOLEAN = 'boolean',
    NUMBER = 'number',
    STRING = 'string',
    OBJECT = 'object',
    NULL = 'null'
}

enum BraceChar {
    CURLY_OPENING = '{',
    CURLY_CLOSING = '}',
    SQUARE_OPENING = '[',
    SQUARE_CLOSING = ']',
}