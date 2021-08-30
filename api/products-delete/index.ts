import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as data from '../shared';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    data.deleteProduct(req.params.id);
    context.res.status(200).json({});
  } catch (error) {
    context.res.status(500).send(error);
  }
};

export default httpTrigger;
