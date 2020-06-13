type JSONFilter = null;

type PropCallback = (prop: string, value: any, parentProps: string[]) => void;

export class ObjectParser {
    static walk(object: object, cb: PropCallback, parentProps?) {
        parentProps = parentProps || [];
        console.log('obj: ', object);
        for (const prop in object) {
            cb(prop, object[prop], parentProps);
            if (typeof object[prop] === 'object' && !(object[prop] instanceof Array)) {
                console.log('walk again');
                this.walk(object[prop], cb, [...parentProps, prop]);
            }
        }
    }
}