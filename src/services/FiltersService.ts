import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export type StaticFilter = {
    name: string,
    value: boolean
};

export enum DynamicFilterName {
    PROPERTY_NAME = 'property-name'
}

export type DynamicFilter = {
    // TODO: replace name type with DynamicFilterName
    name: string,
    value: string
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

    setDynamicFilter(filter: DynamicFilter) {
        this.dynamicFilterSource.next(filter);
    }
}