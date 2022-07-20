import { Values } from "./types";

export const setImageValue = (
  event: React.ChangeEvent<HTMLInputElement>,
  setFieldValue: (field: string, value: any) => void,
  name: string
) => {
  if (event.target.files) {
    setFieldValue(name, URL.createObjectURL(event.target.files[0]));
    setFieldValue("file", event.target.files[0]);
  }
};

export const onSubmit = async (
  values: Values,
  submitRecord: (values: Values) => Promise<void>,
  handleClose: () => void
) => {
  if (values.file) {
    await submitRecord({
      ...values,
      imageData: values.file,
    });
  } else {
    await submitRecord(values);
  }

  handleClose();
};

export const noop = () => {};
