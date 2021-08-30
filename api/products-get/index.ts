import { AzureFunction, Context } from '@azure/functions';
import * as data from '../shared';

const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
  try {
    const products = data.getProducts();
    context.res.status(200).json(products);
  } catch (error) {
    context.res.status(500).send(error);
  }
};

export default httpTrigger;
