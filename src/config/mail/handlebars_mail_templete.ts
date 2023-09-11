import handlebars from "handlebars";

import fs from 'fs';


interface ITempleteVariable{
  [key: string]: string | number;
}


interface IParsemailTemplate{
  file: string;
  variables: ITempleteVariable;
}

export default class HandlebarsMailTemplete {
  public async parse({ file, variables }: IParsemailTemplate): Promise<string>{

    const templateFileContect = await fs.promises.readFile(file,{encoding:'utf-8'});



    const parseTemplate = handlebars.compile(templateFileContect);

    return parseTemplate(variables);

  }
}
