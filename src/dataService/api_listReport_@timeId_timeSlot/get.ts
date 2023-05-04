import axios from "axios";

export type ITimeSlot = {
  time_id: string;
  report_id: string;
  time_slot1: string;
  time_slot2: string;
  time_slot3: string;
  time_slot4: string;
};

export type ITimeSlotBody = {
  report_id: string;
};

export type ITimeSlotRespone = {
  result: ITimeSlot[];
};

export async function getITimeSlot(
  params: ITimeSlotBody
): Promise<ITimeSlotRespone> {
  const getToken = Reflect.get(
    JSON.parse(localStorage.getItem("auth")),
    "token"
  );
  const result = await axios.get(`${process.env.REACT_APP_URL}/api/time_slot`, {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
    params: {
      report_id: params.report_id,
    },
  });
  return Promise.resolve({ result: result.data.result });
}
