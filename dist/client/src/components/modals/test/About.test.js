"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const About_1 = __importDefault(require("../About"));
const user_event_1 = __importDefault(require("@testing-library/user-event"));
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
    updateRecord: jest.fn(),
    handleClose: () => { },
};
test("render component with base structure", () => {
    (0, react_2.render)(<About_1.default {...props}/>);
    const linkElement = react_2.screen.getByText(/Update Record/i);
    expect(linkElement).toBeInTheDocument();
});
test("should update record", () => {
    (0, react_2.render)(<About_1.default {...props}/>);
    const textBox = react_2.screen.getByRole("textbox");
    user_event_1.default.type(textBox, "helllo world");
    const button = react_2.screen.getByRole("button", {
        name: /update/i,
    });
    user_event_1.default.click(button);
    expect(props.updateRecord).toBeCalledTimes(1);
});
