type JSONFilter = null;

type PropCallback = (prop: string, object: object, parentProps: string[]) => void;

export class ObjectParser {
    private filters: Array<JSONFilter>;
    private readonly object: object;

    private constructor(object: object) {
        this.object = object;
    }

    static walk(object: object, callback: PropCallback, parentProps?) {
        parentProps = parentProps || [];
        for (const prop in object) {
            callback(prop, object[prop], parentProps);
            if (typeof object[prop] === 'object' && object[prop] !instanceof Array) {
                ObjectParser.walk(callback, object[prop], [...parentProps, prop]);
            }
        }
    }

    public static fromJSON(jsonString: string): ObjectParser {
        try { return JSON.parse(jsonString); }
        catch (e) { return null; }
    }

    public walk(callback: PropCallback) {
        return ObjectParser.walk(this.object, callback);
    }
}