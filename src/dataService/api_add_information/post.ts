export type ICreateInformation = {
    title :string,
    description :string,
    picture :string | null;
  };
  
  export type ICreateInformationBody = {
    result: true;
  };
  
  type IProp = { data: ICreateInformation };
  
  export function createInformation({
    data,
  }: IProp): Promise<ICreateInformationBody> {
    return Promise.resolve({ result: true });
  }
  