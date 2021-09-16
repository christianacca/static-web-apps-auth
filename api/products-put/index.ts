import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import type { Product } from '@christianacca/shared/shared-types';
import * as data from '../shared';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const product: Product = {
    id: parseInt(req.params.id, 10),
    ...req.body
  };

  try {
    const updatedProduct = data.updateProduct(product);
    context.res.status(200).json(updatedProduct);
  } catch (error) {
    context.res.status(500).send(error);
  }
};

export default httpTrigger;
