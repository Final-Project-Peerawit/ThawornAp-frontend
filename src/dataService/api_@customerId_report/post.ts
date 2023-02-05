export type IcreateReportData = {
  type_report_id: number;
  place_id: number;
  fix_id: number;
  upload_file: string[] | null;
  description: null | string;
};

export type IcreateReportDataBody = {
  result: true;
};

type IProp = {
  customer_id: string;
  data: IcreateReportData;
};

export function createReport({
  customer_id,
  data,
}: IProp): Promise<IcreateReportDataBody> {
  return Promise.resolve({ result: true });
}
