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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const Experience_1 = __importDefault(require("../Experience"));
const props = {
    user: {
        description: "Testing description",
        age: 2,
        createdAt: "01/01/2021",
        experience: 3,
        experiences: [],
        id: 5,
        name: "name",
        profilePicture: null,
        updatedAt: "01/01/2021",
    },
    handleShowDeleteModal: jest.fn(),
    handleCloseDeleteModal: () => { },
    showDeleteModal: false,
    handleShowAddModal: jest.fn(),
    handleShowEditModal: jest.fn(),
    removeExperienceRecord: jest.fn().mockImplementation(() => Promise.resolve()),
};
test("render component with base structure", () => {
    (0, react_1.render)(<Experience_1.default {...props}/>);
    const text = react_1.screen.getByText(/Please add experience/i);
    expect(text).toBeInTheDocument();
});
test("should not render please add experience text when we have experience data", () => __awaiter(void 0, void 0, void 0, function* () {
    const diffProp = Object.assign(Object.assign({}, props), { user: Object.assign(Object.assign({}, props.user), { experiences: [
                {
                    jobTitle: "test",
                    description: "test",
                    startDate: new Date(),
                    endDate: new Date(),
                    companyName: "test",
                    companyLogo: null,
                    id: 1,
                    createdAt: "date",
                    updatedAt: "date",
                    isCurrentlyWorkingHere: false,
                    user_id: 1,
                },
            ] }) });
    (0, react_1.render)(<Experience_1.default {...diffProp}/>);
    const text = yield react_1.screen.findByText(/Experiences/i);
    expect(text).toBeInTheDocument();
}));
test("should click handleShowAddModal", () => {
    const { container } = (0, react_1.render)(<Experience_1.default {...props}/>);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const button = container.querySelector("div[role=experience] > svg");
    expect(button).toBeInTheDocument();
    if (button) {
        user_event_1.default.click(button);
        // eslint-disable-next-line jest/no-conditional-expect
        expect(props.handleShowAddModal).toBeCalledTimes(1);
    }
});
test("should click handleShowEditModal", () => {
    const diffProp = Object.assign(Object.assign({}, props), { user: Object.assign(Object.assign({}, props.user), { experiences: [
                {
                    jobTitle: "test",
                    description: "test",
                    startDate: new Date(),
                    endDate: new Date(),
                    companyName: "test",
                    companyLogo: null,
                    id: 1,
                    createdAt: "date",
                    updatedAt: "date",
                    isCurrentlyWorkingHere: false,
                    user_id: 1,
                },
            ] }) });
    (0, react_1.render)(<Experience_1.default {...diffProp}/>);
    const button = react_1.screen.getByTestId("show-edit-modal");
    expect(button).toBeInTheDocument();
    if (button) {
        user_event_1.default.click(button);
        // eslint-disable-next-line jest/no-conditional-expect
        expect(props.handleShowEditModal).toBeCalledTimes(1);
    }
});
test("should click handleShowDeleteModal", () => {
    const diffProp = Object.assign(Object.assign({}, props), { user: Object.assign(Object.assign({}, props.user), { experiences: [
                {
                    jobTitle: "test",
                    description: "test",
                    startDate: new Date(),
                    endDate: new Date(),
                    companyName: "test",
                    companyLogo: null,
                    id: 1,
                    createdAt: "date",
                    updatedAt: "date",
                    isCurrentlyWorkingHere: false,
                    user_id: 1,
                },
            ] }) });
    (0, react_1.render)(<Experience_1.default {...diffProp}/>);
    const button = react_1.screen.getByTestId("show-delete-modal");
    expect(button).toBeInTheDocument();
    if (button) {
        user_event_1.default.click(button);
        // eslint-disable-next-line jest/no-conditional-expect
        expect(props.handleShowDeleteModal).toBeCalledTimes(1);
    }
});
