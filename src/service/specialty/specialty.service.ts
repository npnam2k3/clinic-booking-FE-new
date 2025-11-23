import { SpecialtyDto } from "@/untils/dto/specialty.dto";
import { authorizedRequest } from "../authorized-request";
import axiosInstance from "../api/axios-instance.service";

export const SpecialtyService = {
  async getAll(): Promise<SpecialtyDto[]> {
    const res = await axiosInstance.get("/specialties");
    return res.data.data;
  },

  async create(payload) {
    const res = await authorizedRequest("post", "/specialties", payload);
    return res.data;
  },

  async update(id, payload) {
    const res = await authorizedRequest("patch", `/specialties/${id}`, payload);
    return res.data;
  },

  async delete(id) {
    const res = await authorizedRequest("delete", `/specialties/${id}`);
    return res.data;
  },
};
