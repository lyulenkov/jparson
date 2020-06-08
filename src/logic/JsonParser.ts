import {ObjectParser} from "./ObjectParser";

export class JsonParser {

    /**
     * @throws Error
     */
    static parse(json: string): ParsedJsonLine[] {
        let value = JSON.parse(json);
        let lines: ParsedJsonLine[];

    }

    static parseObject(object: object) {
        new ObjectParser(object).walk(() => {

        })
    }

    static parseArray(array: []): ParsedJsonLine[] {
        array.forEach(el => {

        })
    }
}

export class ParsedJsonLine {
    private prop: string;
    private value: any;
    private type: string;
    private nestingLevel: number;
}