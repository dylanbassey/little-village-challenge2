import { BASE_URL } from "@/constants/constants";
import { InboundRequest } from "@/interfaces/inboundRequest";
import { OutboundRequest } from "@/interfaces/outboundRequest";
import axios from "axios";

export const postInboundRequest = async (data: InboundRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/submitInbound`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting inbound request:", error);
  }
};

export const postOutboundRequest = async (data: OutboundRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/submitOutbound`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting outbound request:", error);
  }
};

export const postWeightRecord = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/submitWeights`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting weight record:", error);
  }
};

export const getInboundRequests = async (): Promise<InboundRequest[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/inbounds`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inbound requests:", error);
    return [];
  }
};

export const getOutboundRequests = async (): Promise<OutboundRequest[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/outbounds`);
    return response.data;
  } catch (error) {
    console.error("Error fetching outbound requests:", error);
    return [];
  }
};

export const getWeightRecords = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/weightRecords`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weight records:", error);
    return [];
  }
};

export const deleteInboundRequest = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/inbound/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting inbound request:", error);
  }
};

export const deleteOutboundRequest = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/outbound/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting outbound request:", error);
  }
};

export const deleteWeightRecord = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/weightRecord/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting weight record:", error);
  }
};
