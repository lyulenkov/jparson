import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export enum StaticFilterName {
    TYPES = 'f-types'
}

export type StaticFilter = {
    name: StaticFilterName,
    value: boolean
};

export type DynamicFilter = {
    attributeName: string,
    valuePattern: string
};

@Injectable({
    providedIn: 'root'
})
export class FiltersService {
    private staticFilterSource = new Subject<StaticFilter>();
    private dynamicFilterSource = new Subject<DynamicFilter>();

    staticFilter$ = this.staticFilterSource.asObservable();
    dynamicFilters$ = this.dynamicFilterSource.asObservable();

    setStaticFilter(filter: StaticFilter) {
        this.staticFilterSource.next(filter);
    }
}