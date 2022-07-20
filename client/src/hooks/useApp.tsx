import axios from "axios";
import moment from "moment";
import toastr from "toastr";
import { useCallback, useEffect, useState } from "react";
import { ExperienceType, User } from "../types";

const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8001";

type Func = () => void;

export const useApp = (
  handleCloseDeleteModal: Func,
  handleCloseSpinnerModal: Func,
  handleShowSpinnerModal: Func
) => {
  const [user, setUser] = useState<User | null>(null);
  const [experience, setExperience] = useState<ExperienceType | null>(null);

  const [isOnline, setIsOnline] = useState<boolean | null>(
    window.navigator.onLine
  );

  useEffect(() => {
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));

    return () => {
      window.removeEventListener("online", () => {});
      window.removeEventListener("offline", () => {});
    };
  }, []);

  const handleDeleteExperienceApi = useCallback(async (id: string) => {
    await axios.delete(`${API_URL}/v1/experience/delete/${id}`);
  }, []);

  const addExperienceRecordApi = useCallback(
    async (rest: any) => {
      const formData = new FormData();

      Object.keys(rest).forEach((item) => {
        if (item === "startDate" || item === "endDate") {
          if (rest[item])
            formData.append(
              item,
              moment(rest[item]).format("MM/DD/YYYY") || ""
            );
        } else {
          if (item) formData.append(item, rest[item] || "");
        }
      });

      if (user) {
        formData.append("user_id", user?.id.toString());
      }

      const { data } = await axios.post(
        `${API_URL}/v1/experience/add`,
        formData
      );

      if (data) {
        const cloneUser = user;

        if (cloneUser) {
          cloneUser.experiences = [...cloneUser.experiences, data.experience];
          setUser(cloneUser);
        }
      }
    },
    [user]
  );

  const updateExperienceRecordApi = useCallback(
    async (values: any) => {
      const { file, ...rest } = values;

      const formData = new FormData();

      Object.keys(rest).forEach((item) => {
        if (item === "startDate" || item === "endDate") {
          formData.append(item, moment(rest[item]).format("MM/DD/YYYY") || "");
        } else if (item === "isCurrentlyWorkingHere") {
          formData.append(item, JSON.stringify(rest[item]));
        } else {
          formData.append(item, rest[item] || "");
        }
      });

      if (experience) {
        formData.append("user_id", experience?.user_id.toString());
      }

      const { data } = await axios.patch(
        `${API_URL}/v1/experience/update/${experience?.id}`,
        formData
      );

      if (data) {
        const cloneUser = user;

        if (cloneUser) {
          cloneUser.experiences = data.experiences;
          setUser(cloneUser);
        }

        toastr.success("Record update sucessfully");
      }
    },
    [experience, user]
  );

  const handleUserRecordPersist = async (rest: any) => {
    const formData = new FormData();

    Object.keys(rest).forEach((item) => {
      formData.append(item, rest[item] || "");
    });

    const { data } = await axios.patch(`${API_URL}/v1/user/update/2`, formData);

    if (data) {
      setUser(data.user);
      toastr.success("Record update sucessfully");
    }
  };

  useEffect(() => {
    const addExperience = async () => {
      try {
        let expRecord = localStorage.getItem("experience");
        let userRecord = localStorage.getItem("user");
        let deleteExpRecord = localStorage.getItem("delete");
        if (expRecord) {
          expRecord = JSON.parse(expRecord);
          if (expRecord) {
            for (const item of expRecord) {
              const { file, isUpdate, id, ...rest } = item as any;
              if (isUpdate) {
                await updateExperienceRecordApi(rest);
              } else {
                await addExperienceRecordApi(rest);
              }
            }
          }
        }
        if (userRecord) {
          userRecord = JSON.parse(userRecord);
          if (userRecord) {
            for (const item of userRecord) {
              const { file, ...rest } = item as any;

              await handleUserRecordPersist(rest);
            }
          }
        }
        if (deleteExpRecord) {
          deleteExpRecord = JSON.parse(deleteExpRecord);
          if (deleteExpRecord) {
            for (const item of deleteExpRecord) {
              await handleDeleteExperienceApi(item);
            }
          }
        }

        localStorage.removeItem("delete");
        localStorage.removeItem("experience");
        localStorage.removeItem("user");
      } catch (err) {}
    };

    if (isOnline) {
      // check experience record
      addExperience();
    }
  }, [
    addExperienceRecordApi,
    handleDeleteExperienceApi,
    isOnline,
    updateExperienceRecordApi,
  ]);

  useEffect(() => {
    const getUserRecord = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/v1/user/2`);
        if (data.success) {
          setUser(data.user);
        }
      } catch (err) {
        toastr.error("Failed to load user");
      }
    };

    getUserRecord();
  }, []);

  const updateUserRecord = async (values: any) => {
    try {
      handleShowSpinnerModal();
      const { file, ...rest } = values;

      let userRecords = {
        ...rest,
      };

      if (values.file) {
        userRecords = {
          ...rest,
          imageData: values.file,
        };
      }

      if (!isOnline) {
        const item = localStorage.getItem("user");
        if (item) {
          const parsedObj = JSON.parse(item);
          parsedObj.push(userRecords);
          localStorage.setItem("user", JSON.stringify(parsedObj));
        } else {
          if (values.file) {
            const reader = new FileReader();
            reader.onload = function (base64) {
              userRecords.profilePicture = base64.target?.result;
              localStorage.setItem("user", JSON.stringify([userRecords]));
            };

            reader.readAsDataURL(file);
          } else {
            localStorage.setItem("user", JSON.stringify([userRecords]));
          }
        }

        const cloneUser = user;

        if (cloneUser) {
          const changedDataStructured = {
            ...cloneUser,
            ...values,
          };

          setUser(changedDataStructured);
        }

        toastr.success("Record Added sucessfully");
      } else {
        await handleUserRecordPersist(userRecords);
      }
    } catch (err) {
      toastr.error("Unable to update user");
    } finally {
      handleCloseSpinnerModal();
    }
  };

  const updateExperienceRecord = async (values: any) => {
    try {
      handleShowSpinnerModal();
      const { file, ...rest } = values;
      let userRecords = {
        startDate: moment(rest.startDate).format("MM/DD/YYYY"),
        endDate: moment(rest.endDate).format("MM/DD/YYYY"),
        ...rest,
      };

      if (values.file) {
        userRecords = {
          ...rest,
          imageData: values.file,
        };
      }

      if (!isOnline) {
        const item = localStorage.getItem("experience");
        if (item) {
          const parsedObj = JSON.parse(item);
          parsedObj.push({ ...userRecords, isUpdate: true });
          localStorage.setItem("experience", JSON.stringify(parsedObj));
        } else {
          if (values.file) {
            const reader = new FileReader();
            reader.onload = function (base64) {
              userRecords.companyLogo = base64.target?.result;
              localStorage.setItem(
                "experience",
                JSON.stringify([{ ...userRecords, isUpdate: true }])
              );
            };

            reader.readAsDataURL(file);
          } else {
            localStorage.setItem(
              "experience",
              JSON.stringify([{ ...userRecords, isUpdate: true }])
            );
          }
        }

        const cloneUser = user;

        if (cloneUser) {
          const changedDataStructured = {
            ...values,
            startDate: values.startDate
              ? moment(values.startDate).format("MM/DD/YYYY")
              : null,
            endDate: values.endDate
              ? moment(values.endDate).format("MM/DD/YYYY")
              : null,
          };

          const index = cloneUser.experiences.findIndex(
            (i) => i.id === values.id
          );

          cloneUser.experiences[index] = changedDataStructured;

          setUser(cloneUser);
        }
        toastr.success("Record updated sucessfully");
      } else {
        await updateExperienceRecordApi(values);
      }
    } catch (err) {
      toastr.error("Unable to update user");
    } finally {
      handleCloseSpinnerModal();
    }
  };

  const addExperienceRecord = async (values: any) => {
    try {
      handleShowSpinnerModal();
      const { file, ...rest } = values;

      if (!isOnline) {
        let experienceRecords = {
          ...values,
        };

        if (values.file) {
          experienceRecords = {
            ...values,
            imageData: values.file,
          };
        }

        const item = localStorage.getItem("experience");
        if (item) {
          const parsedObj = JSON.parse(item);

          parsedObj.push(experienceRecords);
          localStorage.setItem("experience", JSON.stringify(parsedObj));
        } else {
          localStorage.setItem(
            "experience",
            JSON.stringify([experienceRecords])
          );
        }

        const cloneUser = user;

        if (cloneUser) {
          const changedDataStructured = {
            ...values,
            startDate: values.startDate
              ? moment(values.startDate).format("MM/DD/YYYY")
              : null,
            endDate: values.endDate
              ? moment(values.endDate).format("MM/DD/YYYY")
              : null,
          };

          cloneUser.experiences = [
            ...cloneUser.experiences,
            { ...changedDataStructured },
          ];

          setUser(cloneUser);
        }

        toastr.success("Record Added sucessfully");
      } else {
        await addExperienceRecordApi(rest);
      }
    } catch (err) {
      toastr.error("Unable to Add record");
    } finally {
      handleCloseSpinnerModal();
    }
  };

  const removeExperienceRecord = async (id: string) => {
    try {
      handleShowSpinnerModal();

      if (!isOnline) {
        const clonedUser = user;
        if (clonedUser) {
          const filteredUser = clonedUser?.experiences.filter(
            (item) => item.id.toString() !== id
          );

          clonedUser.experiences = filteredUser;
          setUser(clonedUser);

          let rd = localStorage.getItem("delete") as any;
          if (rd) {
            rd = JSON.parse(rd);
            rd.push(id);
          } else {
            localStorage.setItem("delete", JSON.stringify([id]));
          }
        }
      } else {
        handleDeleteExperienceApi(id);
      }
    } catch (err) {
      toastr.error("Unable to Delete record");
    } finally {
      handleCloseDeleteModal();
      handleCloseSpinnerModal();
    }
  };

  return {
    setExperience,
    experience,
    user,
    updateUserRecord,
    updateExperienceRecord,
    removeExperienceRecord,
    addExperienceRecord,
  };
};
