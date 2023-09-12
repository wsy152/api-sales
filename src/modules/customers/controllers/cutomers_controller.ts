import { Request, Response } from "express";
import { ListCustomerSercice } from "../services/list_customer_services";
import CreateCutomerSercice from "../services/create_customer_service";
import { ShowCutomerSercice } from "../services/show_customer_service";
import UpdateCutomerSercice from "../services/update_cutomer_service";
import { DeleteCutomerSercice } from "../services/delete_customer_service";




export default class CustumersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listCustomer = new ListCustomerSercice();

    const cutomers = await listCustomer.execute();

    return res.json(cutomers);

  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createCutomer = new CreateCutomerSercice();

    const custumer = await createCutomer.execute({
      name,
      email,
    });
    return res.json(custumer);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showCutomer = new ShowCutomerSercice();

    const custumer = await showCutomer.execute({ id });

    return res.json(custumer);

  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;

    const updateCutumer = new UpdateCutomerSercice();

    const cutumer = await updateCutumer.execute({
      id,
      name,
      email,
    });

    return res.json(cutumer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteCutumer = new DeleteCutomerSercice();

    await deleteCutumer.execute({ id });

    return res.json([]);

  }

}
