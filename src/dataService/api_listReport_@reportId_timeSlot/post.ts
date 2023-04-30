import axios from "axios";

export type createTimeSlotParams = {
  report_id: string;
};

export type createTimeSlotBody = {
  time_slot1?: string | null;
  time_slot2?: string | null;
  time_slot3?: string | null;
  time_slot4?: string | null;
};

export type createTimeSlotResponse = {
  result: boolean;
};

export async function createTimeSlot(
  params: createTimeSlotParams,
  body: createTimeSlotBody
): Promise<createTimeSlotResponse> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );

  const result = await axios.post(
    `${process.env.REACT_APP_URL}/api/list-report/${params.report_id}/time-slot`,
    {
      time_slot1: body.time_slot1,
      time_slot2: body.time_slot2,
      time_slot3: body.time_slot3,
      time_slot4: body.time_slot4,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );

  return Promise.resolve({ result: result.data.result });
}
