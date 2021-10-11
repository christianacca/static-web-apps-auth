# Add a domain model and associated data access

**Note**: The following guidance assumes you are using ngrx-data for your data persistance.

For more information about ngrx-data see: <https://ngrx.io/guide/data>

## Steps

Add the following code:

1. Domain model
2. Entity collection service (eg [product.service.ts](libs/shared/products/src/lib/product.service.ts))
   - optional: [Entity data service](https://ngrx.io/guide/data/extension-points#custom-data-service)
3. Add the model metadata as an entry in entity metadata:
   - See example: [entity-metadata.ts](libs/shared/products/src/lib/entity-metadata.ts)
4. Dependency injection registration code (**IMPORTANT**: how to do this will depend on whether or not the entity belongs to a lazy loaded feature module):
   - For shared domain library use: `{ provide: ENTITY_METADATA_TOKEN, multi: true, useValue: entityMetadata }`
   - For a lazy loaded feature library see: [products.module.ts](libs/shared/products/src/lib/products.module.ts)
