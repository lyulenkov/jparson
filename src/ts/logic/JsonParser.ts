import {ObjectParser} from "./ObjectParser";

export class JsonParser {

    /**
     * @throws Error
     */
    static parse(json: string): ParsedJSONNode {
        let value = JSON.parse(json);
        let lineCounter = {value: 0};
        if (value && typeof value === JsonTypes.OBJECT) {
            if (value instanceof Array) {
                return this.parseArray(value, lineCounter);
            }
            return this.parseObject(value, lineCounter);
        }
        return this.parsePrimitive(value, lineCounter);
    }

    static parseObject(object: object, lineCounter: LineCounter, prop?: string): ParsedJSONNode {
        let node = new ParsedJSONNode({
            prop,
            type: JsonTypes.OBJECT,
            postfix: BraceChar.CURLY_OPENING,
            valueHint: '{...}',
            number: ++lineCounter.value
        });
        ObjectParser.walk(object,(prop, value, parentProps) => {
            if (value instanceof Array) {
                node.children.push(this.parseArray(value, lineCounter, prop));
            } else {
                node.children.push(this.parsePrimitive(value, lineCounter, prop));
            }
        });
        node.setClosingLineNode(new ParsedJSONNode({
            postfix: BraceChar.CURLY_CLOSING,
            number: ++lineCounter.value
        }));
        return node;
    }

    static parseArray(array: any[], lineCounter: LineCounter, prop?: string): ParsedJSONNode {
        let node = new ParsedJSONNode({
            prop: this.normalizePropName(prop),
            type: JsonTypes.ARRAY,
            postfix: BraceChar.SQUARE_OPENING,
            valueHint: '[...]',
            number: ++lineCounter.value
        });
        array.forEach(value => {
            if (typeof value == JsonTypes.OBJECT) {
                node.children.push(this.parseObject(value, lineCounter));
                return;
            }
            node.children.push(this.parsePrimitive(value, lineCounter));
        });
        node.setClosingLineNode(new ParsedJSONNode({
            postfix: BraceChar.SQUARE_CLOSING,
            number: ++lineCounter.value
        }));
        return node;
    }

    static parsePrimitive(value: any, lineCounter: LineCounter, prop?: string): ParsedJSONNode {
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
            type: type,
            number: ++lineCounter.value
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
    isClosingLine?: boolean,
    valueHint?: string,
    number: number,
    rejectedByFilters?: Set<string>
};

export class ParsedJSONNode {
    children: ParsedJSONNode[] = [];
    isFolded = false;
    private _isHovered = false;
    private closingLine: ParsedJSONNode;
    private correspondingOpeningLineNode: ParsedJSONNode;

    constructor(readonly value: ParsedJSONLine) {}

    hasChildren() {
        return this.children.length;
    }

    setClosingLineNode(line: ParsedJSONNode) {
        // line.parentNode = this;
        line.setCorrespondingOpeningLineNode(this);
        this.closingLine = line;
    }

    private setCorrespondingOpeningLineNode(node: ParsedJSONNode) {
        this.correspondingOpeningLineNode = node;
    }

    getCorrespondingOpeningLineNode() {
        return this.correspondingOpeningLineNode;
    }

    setHover() {
        this._isHovered = true;
    }

    removeHover() {
        this._isHovered = false;
    }

    isHovered() {
        return this._isHovered;
    }

    getClosingLineNode() {
        return this.closingLine;
    }

    isClosingLine() {
        return !!this.correspondingOpeningLineNode;
    }

    isFoldingLine() {
        return this.hasChildren() || this.isClosingLine();
    }

    isFilteredOut() {
        return this.value.rejectedByFilters?.size;
    }

    toggleFolded() {
        if (this.isClosingLine()) {
            this.correspondingOpeningLineNode.toggleFolded();
        } else {
            this.isFolded = !this.isFolded;
        }
    }
}

type LineCounter = {value: number};

enum JsonTypes {
    BOOLEAN = 'boolean',
    NUMBER = 'number',
    STRING = 'string',
    OBJECT = 'object',
    ARRAY = 'array',
    NULL = 'null'
}

enum BraceChar {
    CURLY_OPENING = '{',
    CURLY_CLOSING = '}',
    SQUARE_OPENING = '[',
    SQUARE_CLOSING = ']',
}