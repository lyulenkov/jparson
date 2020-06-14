type JSONFilter = null;

type PropCallback = (prop: string, value: any, parentProps: string[]) => void;

export class ObjectParser {
    static walk(object: object, cb: PropCallback, parentProps?) {
        parentProps = parentProps || [];
        for (const prop in object) {
            cb(prop, object[prop], parentProps);
            if (typeof object[prop] === 'object' && !(object[prop] instanceof Array)) {
                this.walk(object[prop], cb, [...parentProps, prop]);
            }
        }
    }
}