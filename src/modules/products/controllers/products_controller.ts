import { Request, Response } from "express";
import { ListProductSercice } from "../services/list_product_service";
import { ShowProductSercice } from "../services/show_product_service";
import { UpdateProductSercice } from "../services/update_product_service";
import { DeleteProductSercice } from "../services/delete_product_service";
import CreateProductSercice from "../services/create_product_service";



export default class ProductsController {
  public async index(req: Request, res: Response): Promise<Response>{

    const listProducts = new ListProductSercice();

    const products = await listProducts.execute();

    return res.json(products);

  }

  public async show(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;

    const showProduct = new ShowProductSercice();

    const product = await showProduct.execute({id});

    return res.json(product);

  }

  public async create(req: Request, res: Response): Promise<Response>{

    const {name, price,quantity} = req.body;

    const createProduct = new CreateProductSercice();

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const {id} = req.params;

    const updateProduct = new UpdateProductSercice();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return res.json(product);
  }



  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteProduct = new DeleteProductSercice();

    await deleteProduct.execute({ id });

    return res.json([]);

  }
}


