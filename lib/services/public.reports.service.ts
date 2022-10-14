import { axiosPublicInstance } from "@config/axios";
// api routes
import { USER_REPORT_UUID_VERIFICATION } from "@constants/routes";

export const UserReportPinConfirmation = async (data: any) => {
  try {
    const response = await axiosPublicInstance.post(
      USER_REPORT_UUID_VERIFICATION(data?.uuid),
      data?.payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
