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
const ProfilePic_1 = __importDefault(require("../ProfilePic"));
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
    handleShow: jest.fn(),
};
test("render component with base structure", () => {
    (0, react_1.render)(<ProfilePic_1.default {...props}/>);
    const text = react_1.screen.getByText(/Age\s-/i);
    expect(text).toBeInTheDocument();
});
test("should click handleClick", () => __awaiter(void 0, void 0, void 0, function* () {
    const { container } = (0, react_1.render)(<ProfilePic_1.default {...props}/>);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const button = container.querySelector("div[role=info] > svg");
    expect(button).toBeInTheDocument();
    if (button) {
        user_event_1.default.click(button);
        // eslint-disable-next-line jest/no-conditional-expect
        expect(props.handleShow).toBeCalledTimes(1);
    }
}));
