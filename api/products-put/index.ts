import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as data from '../shared';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const product = {
    id: parseInt(req.params.id, 10),
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity
  };

  try {
    const updatedProduct = data.updateProduct(product);
    context.res.status(200).json(updatedProduct);
  } catch (error) {
    context.res.status(500).send(error);
  }
};

export default httpTrigger;
