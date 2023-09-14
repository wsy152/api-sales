import { Request, Response } from "express";
import ShowOrderSercice from "../services/show_order_service copy";
import CreateOrderSercice from "../services/create_order_service";




export default class OrdersController {
  public async create(req: Request, res: Response): Promise<Response> {

    const { customerId, products} = req.body;

    const createOrder = new CreateOrderSercice();

    const order = await createOrder.execute({
      customerId,
      products,

    });

    return res.json(order);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;

    const showOrder = new ShowOrderSercice();

    const order = await showOrder.execute({id});

    return res.json(order);

  }


}


