import axios from "axios";

export type updateTimeSlotParams = {
  time_id: string;
};

export type createTimeSlotBody = {
  time_slot1?: string | null;
  time_slot2?: string | null;
  time_slot3?: string | null;
  time_slot4?: string | null;
};

export type updateTimeSlotParamsTimeSlotResponse = {
  result: boolean;
};

export async function updateTimeSlot(
  params: updateTimeSlotParams,
  body: createTimeSlotBody
): Promise<updateTimeSlotParamsTimeSlotResponse> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );

  const result = await axios.put(
    `${process.env.REACT_APP_URL}/api/list-report/${params.time_id}/time-slot`,
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
