import axios from "axios";

export type deleteTimeSlotParams = {
  report_id: string;
};

export type deleteTimeSlotResponse = {
  result: boolean;
};

export async function deleteTimeSlot(
  params: deleteTimeSlotParams
): Promise<deleteTimeSlotResponse> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );

  const result = await axios.delete(
    `${process.env.REACT_APP_URL}/api/list-report/${params.report_id}/delete`,
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );

  return Promise.resolve({ result: result.data.result });
}
