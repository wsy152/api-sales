import handlebars from "handlebars";


interface ITempleteVariable{
  [key: string]: string | number;
}


interface IParsemailTemplate{
  template: string;
  variables: ITempleteVariable;
}

export default class HandlebarsMailTemplete {
  public async parse({ template, variables }: IParsemailTemplate): Promise<string>{
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);

  }
}
