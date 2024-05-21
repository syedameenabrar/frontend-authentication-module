import { InjectionToken } from "@angular/core";

export interface LibraryConfig{
    subscribe(arg0: (data: any) => void): unknown;
    // apiUrl:string;
    // loginNextRoute:string;
}


export const LIBRARY_CONFIG = new InjectionToken<LibraryConfig>("");