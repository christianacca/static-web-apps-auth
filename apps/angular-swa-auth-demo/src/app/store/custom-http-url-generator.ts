import { Injectable } from '@angular/core';
import { DefaultHttpUrlGenerator } from '@ngrx/data';

@Injectable()
export class CustomHttpUrlGenerator extends DefaultHttpUrlGenerator {
  entityResource(entityName: string, root: string): string {
    // our app convention is the path to single resource is pluralized
    return this.getResourceUrls(entityName, root).collectionResourceUrl;
  }
}
