import axios from "axios";

export type updateTimeSlotParams = {
  time_id: string;
};

export type createTimeSlotBody = {
  time_slot1?: string | null;
  time_slot2?: string | null;
  time_slot3?: string | null;
  time_slot4?: string | null;
  report_id: string;
};

export type updateTimeSlotParamsTimeSlotResponse = {
  result: boolean;
};

export type IPropUpdateSelectTimeSlot = {
  params: updateTimeSlotParams;
  body: createTimeSlotBody;
};

export async function updateTimeSlot(
  data: IPropUpdateSelectTimeSlot
): Promise<updateTimeSlotParamsTimeSlotResponse> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );

  const result = await axios.put(
    `${process.env.REACT_APP_URL}/api/list-report/${data.params.time_id}/update`,
    {
      time_slot1: data.body.time_slot1,
      time_slot2: data.body.time_slot2,
      time_slot3: data.body.time_slot3,
      time_slot4: data.body.time_slot4,
      report_id: data.body.report_id,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );

  return Promise.resolve({ result: result.data.result });
}
