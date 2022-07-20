import * as yup from "yup";

export const validateSchema = yup.object().shape({
  startDate: yup.date().max(new Date(), "Start date cannot be a future date"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "end date can't be before start date"),
});
