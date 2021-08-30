import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as data from '../shared';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const product = {
    id: undefined,
    name: req.body.name,
    description: req.body.description
  };

  try {
    const newProduct = data.addProduct(product);
    context.res.status(201).json(newProduct);
  } catch (error) {
    context.res.status(500).send(error);
  }
};

export default httpTrigger;
