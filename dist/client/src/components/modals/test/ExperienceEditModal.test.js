"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const ExperienceEditModal_1 = __importDefault(require("../ExperienceEditModal"));
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const props = {
    experience: {
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
    updateRecord: jest.fn(),
    handleClose: jest.fn(),
};
test("render component with base structure", () => {
    (0, react_2.render)(<ExperienceEditModal_1.default {...props}/>);
    const linkElement = react_2.screen.getByText(/Update Record/i);
    expect(linkElement).toBeInTheDocument();
});
test("should update record", () => {
    (0, react_2.render)(<ExperienceEditModal_1.default {...props}/>);
    const textBox = react_2.screen.getByTestId("add-modal-description");
    user_event_1.default.type(textBox, "helllo world");
    const button = react_2.screen.getByRole("button", {
        name: /Update/i,
    });
    user_event_1.default.click(button);
    expect(props.updateRecord).toBeCalledTimes(1);
});
test("should close modal", () => {
    (0, react_2.render)(<ExperienceEditModal_1.default {...props}/>);
    const button = react_2.screen.getByRole("button", { name: "Close" });
    user_event_1.default.click(button);
    expect(props.handleClose).toBeCalledTimes(1);
});
