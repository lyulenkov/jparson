import {ObjectParser} from "./ObjectParser";

export class JsonParser {

    /**
     * @throws Error
     */
    static parse(json: string): ParsedJsonLine[] {
        let value = JSON.parse(json);
        if (value && typeof value === JsonTypes.OBJECT) {
            if (value instanceof Array) {
                return this.parseArray(value, 0);
            }
            return this.parseObject(value, 0);
        }
        return [this.parsePrimitive(value, 0)];
    }

    static parseObject(object: object, nestingLevel: number): ParsedJsonLine[] {
        let lines: ParsedJsonLine[] = [];
        lines.push({
            postfix: StandardSymbols.CURLY_BRACE_OPENING,
            nestingLevel
        });
        nestingLevel++;
        ObjectParser.walk(object,(prop, value, parentProps) => {
            if (value instanceof Array) {
                lines.push(...this.parseArray(value, nestingLevel, prop));
            } else {
                lines.push(this.parsePrimitive(value, nestingLevel + parentProps.length, prop));
            }
        });
        lines.push({
            postfix: StandardSymbols.CURLY_BRACE_CLOSING,
            nestingLevel: nestingLevel - 1
        });
        return lines;
    }

    static parseArray(array: any[], nestingLevel: number, prop?: string): ParsedJsonLine[] {
        let lines: ParsedJsonLine[] = [];
        lines.push({
            prop: this.normalizePropName(prop),
            postfix: StandardSymbols.SQUARE_BRACKET_OPENING,
            nestingLevel
        });
        nestingLevel++;
        array.forEach(value => {
            if (typeof value == JsonTypes.OBJECT) {
                lines.push(...this.parseObject(value, nestingLevel));
                return;
            }
            lines.push(this.parsePrimitive(value, nestingLevel));
        });
        lines.push({
            postfix: StandardSymbols.SQUARE_BRACKET_CLOSING,
            nestingLevel: nestingLevel - 1
        });
        return lines;
    }

    static parsePrimitive(value: any, nestingLevel: number, prop?: string): ParsedJsonLine {
        let type: string = typeof value;
        if (type == JsonTypes.STRING) {
            value = `"${value}"`;
        }
        if (value === null) {
            value = 'null';
            type = JsonTypes.NULL;
        } else {
            value = '' + value;
        }
        return {
            prop: this.normalizePropName(prop),
            value: value,
            type: type,
            nestingLevel
        };
    }

    static normalizePropName(prop: string): string {
        if (prop && prop.includes(' ')) {
            return `"${prop}"`;
        }
        return prop;
    }
}

export type ParsedJsonLine = {
    prop?: string,
    value?: string,
    type?: string,
    postfix?: string,
    nestingLevel: number,
    rejectedByFilters?: Set<string>
};

enum JsonTypes {
    BOOLEAN = 'boolean',
    NUMBER = 'number',
    STRING = 'string',
    OBJECT = 'object',
    NULL = 'null'
}

enum StandardSymbols {
    CURLY_BRACE_OPENING = '{',
    CURLY_BRACE_CLOSING = '}',
    SQUARE_BRACKET_OPENING = '[',
    SQUARE_BRACKET_CLOSING = ']'
}