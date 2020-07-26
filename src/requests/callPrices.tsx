import { ICallPrice } from "../models/CallPrice";
import { api } from "../services/Api";
import { AxiosResponse } from "axios";

export async function getCallPricesAPI(): Promise<AxiosResponse<ICallPrice[]>> {
  try {
    return await api.get("/call_prices");
  } catch (error) {
    throw error;
  }
}

export async function addCallPriceAPI(
  newData: ICallPrice
): Promise<AxiosResponse<ICallPrice>> {
  try {
    return await api.post("/call_prices", newData);
  } catch (error) {
    throw error;
  }
}

export async function updateCallPriceAPI(
  newData: ICallPrice
): Promise<AxiosResponse<ICallPrice>> {
  try {
    return await api.put("/call_prices", newData);
  } catch (error) {
    throw error;
  }
}

export async function removeCallPriceAPI(
  oldData: ICallPrice
): Promise<AxiosResponse<undefined>> {
  try {
    return await api.delete("/call_prices/" + oldData.id);
  } catch (error) {
    throw error;
  }
}
