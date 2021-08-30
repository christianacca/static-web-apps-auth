import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import type { Product } from '@christianacca/demo-app/shared-types';
import * as data from '../shared';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const product: Product = {
    id: undefined,
    ...req.body
  };

  try {
    const newProduct = data.addProduct(product);
    context.res.status(201).json(newProduct);
  } catch (error) {
    context.res.status(500).send(error);
  }
};

export default httpTrigger;
