"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApp = void 0;
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const toastr_1 = __importDefault(require("toastr"));
const react_1 = require("react");
const API_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:8001";
const useApp = (handleCloseDeleteModal, handleCloseSpinnerModal, handleShowSpinnerModal) => {
    const [user, setUser] = (0, react_1.useState)(null);
    const [experience, setExperience] = (0, react_1.useState)(null);
    const [isOnline, setIsOnline] = (0, react_1.useState)(window.navigator.onLine);
    (0, react_1.useEffect)(() => {
        window.addEventListener("online", () => setIsOnline(true));
        window.addEventListener("offline", () => setIsOnline(false));
        return () => {
            window.removeEventListener("online", () => { });
            window.removeEventListener("offline", () => { });
        };
    }, []);
    const handleDeleteExperienceApi = (0, react_1.useCallback)((id) => __awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default.delete(`${API_URL}/v1/experience/delete/${id}`);
    }), []);
    const addExperienceRecordApi = (0, react_1.useCallback)((rest) => __awaiter(void 0, void 0, void 0, function* () {
        const formData = new FormData();
        Object.keys(rest).forEach((item) => {
            if (item === "startDate" || item === "endDate") {
                if (rest[item])
                    formData.append(item, (0, moment_1.default)(rest[item]).format("MM/DD/YYYY") || "");
            }
            else {
                if (item)
                    formData.append(item, rest[item] || "");
            }
        });
        if (user) {
            formData.append("user_id", user === null || user === void 0 ? void 0 : user.id.toString());
        }
        const { data } = yield axios_1.default.post(`${API_URL}/v1/experience/add`, formData);
        if (data) {
            const cloneUser = user;
            if (cloneUser) {
                cloneUser.experiences = [...cloneUser.experiences, data.experience];
                setUser(cloneUser);
            }
        }
    }), [user]);
    const updateExperienceRecordApi = (0, react_1.useCallback)((values) => __awaiter(void 0, void 0, void 0, function* () {
        const { file } = values, rest = __rest(values, ["file"]);
        const formData = new FormData();
        Object.keys(rest).forEach((item) => {
            if (item === "startDate" || item === "endDate") {
                formData.append(item, (0, moment_1.default)(rest[item]).format("MM/DD/YYYY") || "");
            }
            else if (item === "isCurrentlyWorkingHere") {
                formData.append(item, JSON.stringify(rest[item]));
            }
            else {
                formData.append(item, rest[item] || "");
            }
        });
        if (experience) {
            formData.append("user_id", experience === null || experience === void 0 ? void 0 : experience.user_id.toString());
        }
        const { data } = yield axios_1.default.patch(`${API_URL}/v1/experience/update/${experience === null || experience === void 0 ? void 0 : experience.id}`, formData);
        if (data) {
            const cloneUser = user;
            if (cloneUser) {
                cloneUser.experiences = data.experiences;
                setUser(cloneUser);
            }
            toastr_1.default.success("Record update sucessfully");
        }
    }), [experience, user]);
    const handleUserRecordPersist = (rest) => __awaiter(void 0, void 0, void 0, function* () {
        const formData = new FormData();
        Object.keys(rest).forEach((item) => {
            formData.append(item, rest[item] || "");
        });
        const { data } = yield axios_1.default.patch(`${API_URL}/v1/user/update/2`, formData);
        if (data) {
            setUser(data.user);
            toastr_1.default.success("Record update sucessfully");
        }
    });
    (0, react_1.useEffect)(() => {
        const addExperience = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let expRecord = localStorage.getItem("experience");
                let userRecord = localStorage.getItem("user");
                let deleteExpRecord = localStorage.getItem("delete");
                if (expRecord) {
                    expRecord = JSON.parse(expRecord);
                    if (expRecord) {
                        for (const item of expRecord) {
                            const _a = item, { file, isUpdate, id } = _a, rest = __rest(_a, ["file", "isUpdate", "id"]);
                            if (isUpdate) {
                                yield updateExperienceRecordApi(rest);
                            }
                            else {
                                yield addExperienceRecordApi(rest);
                            }
                        }
                    }
                }
                if (userRecord) {
                    userRecord = JSON.parse(userRecord);
                    if (userRecord) {
                        for (const item of userRecord) {
                            const _b = item, { file } = _b, rest = __rest(_b, ["file"]);
                            yield handleUserRecordPersist(rest);
                        }
                    }
                }
                if (deleteExpRecord) {
                    deleteExpRecord = JSON.parse(deleteExpRecord);
                    if (deleteExpRecord) {
                        for (const item of deleteExpRecord) {
                            yield handleDeleteExperienceApi(item);
                        }
                    }
                }
                localStorage.removeItem("delete");
                localStorage.removeItem("experience");
                localStorage.removeItem("user");
            }
            catch (err) { }
        });
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
    (0, react_1.useEffect)(() => {
        const getUserRecord = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(`${API_URL}/v1/user/2`);
                if (data.success) {
                    setUser(data.user);
                }
            }
            catch (err) {
                toastr_1.default.error("Failed to load user");
            }
        });
        getUserRecord();
    }, []);
    const updateUserRecord = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            handleShowSpinnerModal();
            const { file } = values, rest = __rest(values, ["file"]);
            let userRecords = Object.assign({}, rest);
            if (values.file) {
                userRecords = Object.assign(Object.assign({}, rest), { imageData: values.file });
            }
            if (!isOnline) {
                const item = localStorage.getItem("user");
                if (item) {
                    const parsedObj = JSON.parse(item);
                    parsedObj.push(userRecords);
                    localStorage.setItem("user", JSON.stringify(parsedObj));
                }
                else {
                    if (values.file) {
                        const reader = new FileReader();
                        reader.onload = function (base64) {
                            var _a;
                            userRecords.profilePicture = (_a = base64.target) === null || _a === void 0 ? void 0 : _a.result;
                            localStorage.setItem("user", JSON.stringify([userRecords]));
                        };
                        reader.readAsDataURL(file);
                    }
                    else {
                        localStorage.setItem("user", JSON.stringify([userRecords]));
                    }
                }
                const cloneUser = user;
                if (cloneUser) {
                    const changedDataStructured = Object.assign(Object.assign({}, cloneUser), values);
                    setUser(changedDataStructured);
                }
                toastr_1.default.success("Record Added sucessfully");
            }
            else {
                yield handleUserRecordPersist(userRecords);
            }
        }
        catch (err) {
            toastr_1.default.error("Unable to update user");
        }
        finally {
            handleCloseSpinnerModal();
        }
    });
    const updateExperienceRecord = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            handleShowSpinnerModal();
            const { file } = values, rest = __rest(values, ["file"]);
            let userRecords = Object.assign({ startDate: (0, moment_1.default)(rest.startDate).format("MM/DD/YYYY"), endDate: (0, moment_1.default)(rest.endDate).format("MM/DD/YYYY") }, rest);
            if (values.file) {
                userRecords = Object.assign(Object.assign({}, rest), { imageData: values.file });
            }
            if (!isOnline) {
                const item = localStorage.getItem("experience");
                if (item) {
                    const parsedObj = JSON.parse(item);
                    parsedObj.push(Object.assign(Object.assign({}, userRecords), { isUpdate: true }));
                    localStorage.setItem("experience", JSON.stringify(parsedObj));
                }
                else {
                    if (values.file) {
                        const reader = new FileReader();
                        reader.onload = function (base64) {
                            var _a;
                            userRecords.companyLogo = (_a = base64.target) === null || _a === void 0 ? void 0 : _a.result;
                            localStorage.setItem("experience", JSON.stringify([Object.assign(Object.assign({}, userRecords), { isUpdate: true })]));
                        };
                        reader.readAsDataURL(file);
                    }
                    else {
                        localStorage.setItem("experience", JSON.stringify([Object.assign(Object.assign({}, userRecords), { isUpdate: true })]));
                    }
                }
                const cloneUser = user;
                if (cloneUser) {
                    const changedDataStructured = Object.assign(Object.assign({}, values), { startDate: values.startDate
                            ? (0, moment_1.default)(values.startDate).format("MM/DD/YYYY")
                            : null, endDate: values.endDate
                            ? (0, moment_1.default)(values.endDate).format("MM/DD/YYYY")
                            : null });
                    const index = cloneUser.experiences.findIndex((i) => i.id === values.id);
                    cloneUser.experiences[index] = changedDataStructured;
                    setUser(cloneUser);
                }
                toastr_1.default.success("Record updated sucessfully");
            }
            else {
                yield updateExperienceRecordApi(values);
            }
        }
        catch (err) {
            toastr_1.default.error("Unable to update user");
        }
        finally {
            handleCloseSpinnerModal();
        }
    });
    const addExperienceRecord = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            handleShowSpinnerModal();
            const { file } = values, rest = __rest(values, ["file"]);
            if (!isOnline) {
                let experienceRecords = Object.assign({}, values);
                if (values.file) {
                    experienceRecords = Object.assign(Object.assign({}, values), { imageData: values.file });
                }
                const item = localStorage.getItem("experience");
                if (item) {
                    const parsedObj = JSON.parse(item);
                    parsedObj.push(experienceRecords);
                    localStorage.setItem("experience", JSON.stringify(parsedObj));
                }
                else {
                    localStorage.setItem("experience", JSON.stringify([experienceRecords]));
                }
                const cloneUser = user;
                if (cloneUser) {
                    const changedDataStructured = Object.assign(Object.assign({}, values), { startDate: values.startDate
                            ? (0, moment_1.default)(values.startDate).format("MM/DD/YYYY")
                            : null, endDate: values.endDate
                            ? (0, moment_1.default)(values.endDate).format("MM/DD/YYYY")
                            : null });
                    cloneUser.experiences = [
                        ...cloneUser.experiences,
                        Object.assign({}, changedDataStructured),
                    ];
                    setUser(cloneUser);
                }
                toastr_1.default.success("Record Added sucessfully");
            }
            else {
                yield addExperienceRecordApi(rest);
            }
        }
        catch (err) {
            toastr_1.default.error("Unable to Add record");
        }
        finally {
            handleCloseSpinnerModal();
        }
    });
    const removeExperienceRecord = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            handleShowSpinnerModal();
            if (!isOnline) {
                const clonedUser = user;
                if (clonedUser) {
                    const filteredUser = clonedUser === null || clonedUser === void 0 ? void 0 : clonedUser.experiences.filter((item) => item.id.toString() !== id);
                    clonedUser.experiences = filteredUser;
                    setUser(clonedUser);
                    let rd = localStorage.getItem("delete");
                    if (rd) {
                        rd = JSON.parse(rd);
                        rd.push(id);
                    }
                    else {
                        localStorage.setItem("delete", JSON.stringify([id]));
                    }
                }
            }
            else {
                handleDeleteExperienceApi(id);
            }
        }
        catch (err) {
            toastr_1.default.error("Unable to Delete record");
        }
        finally {
            handleCloseDeleteModal();
            handleCloseSpinnerModal();
        }
    });
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
exports.useApp = useApp;
