export type IUpdateInformationParam = {
  id: number;
};

export type IUpdateInformationQuery = {
  isActive?: boolean;
  title?: string;
  description?: string;
  picture?: string | null;
};

export type ICreateInformationBody = {
  result: true;
};

type IProp = {
  params: IUpdateInformationParam;
  query: IUpdateInformationQuery;
};

export function upDateInformation({
    params , query,
}: IProp): Promise<ICreateInformationBody> {
  return Promise.resolve({ result: true });
}
