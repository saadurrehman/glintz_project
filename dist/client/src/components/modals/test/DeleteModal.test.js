"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const DeleteModal_1 = __importDefault(require("../DeleteModal"));
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const props = {
    deleteRecord: jest.fn(),
    recordId: "hello",
    handleModalClose: jest.fn(),
};
test("render component with base structure", () => {
    (0, react_2.render)(<DeleteModal_1.default {...props}/>);
    const linkElement = react_2.screen.getByText(/Are you sure you want to delete the record/i);
    expect(linkElement).toBeInTheDocument();
});
test("should delete record", () => {
    (0, react_2.render)(<DeleteModal_1.default {...props}/>);
    const button = react_2.screen.getByRole("button", { name: "Delete" });
    user_event_1.default.click(button);
    expect(props.deleteRecord).toBeCalledTimes(1);
});
