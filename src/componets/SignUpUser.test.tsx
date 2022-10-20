import {fireEvent, render, screen} from "@testing-library/react";
import SignUpUser from "./SignUpUser";

describe("Render component", () => {

    it("should render the labels correctly", async () => {
        render(<SignUpUser/>);

        const fullNameLabel = await screen.findByLabelText("Full name:");
        const emailLabel = await screen.findByLabelText("Email:");
        const passwordLabel = await screen.findByLabelText("Password:");
        const confirmLabel = await screen.findByLabelText("Confirm:");


        expect(fullNameLabel).toBeInTheDocument();
        expect(emailLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
        expect(confirmLabel).toBeInTheDocument();
    });

    it("should render the placeholders correctly", async () => {
        render(<SignUpUser/>)
        const fullNamePlaceHolder = await screen.findByPlaceholderText("Enter full name");
        const emailPlaceholder = await screen.findByPlaceholderText("Enter email")
        const passwordPlaceholder = await screen.findByPlaceholderText("Enter password")
        const confirmPasswordPlaceholder = await screen.findByPlaceholderText("Confirm password")


        expect(fullNamePlaceHolder).toBeInTheDocument();
        expect(emailPlaceholder).toBeInTheDocument();
        expect(passwordPlaceholder).toBeInTheDocument();
        expect(confirmPasswordPlaceholder).toBeInTheDocument();
    });

    it("should render button with the correct text", async () => {
        render(<SignUpUser/>);

        const submitBtn = await screen.findByTestId("submit-button");

        expect(submitBtn).toBeInTheDocument();
        expect(submitBtn).toHaveValue("Submit");
    });
});

describe("Input handling", () => {

    const mockInputs = {
        fullName: "John Doe",
        email: "email@gmail.com",
        password: "qwerty123",
        confirm: "qwerty123"
    }

    it("should update input values on a change event", async () => {
        render(<SignUpUser/>);

        const fullNameInput = await screen.findByPlaceholderText("Enter full name");
        const emailInput = await screen.findByPlaceholderText("Enter email");
        const passwordInput = await screen.findByPlaceholderText("Enter password");
        const confirmInput = await screen.findByPlaceholderText("Confirm password");


        fireEvent.change(fullNameInput, {target: {value: mockInputs.fullName}});
        fireEvent.change(emailInput, {target: {value: mockInputs.email}});
        fireEvent.change(passwordInput, {target: {value: mockInputs.password}});
        fireEvent.change(confirmInput, {target: {value: mockInputs.confirm}});

        expect(fullNameInput).toHaveValue(mockInputs.fullName);
        expect(emailInput).toHaveValue(mockInputs.email);
        expect(passwordInput).toHaveValue(mockInputs.password);
        expect(confirmInput).toHaveValue(mockInputs.confirm);
    });

    it("should display 4 error messages if the fields are empty", async () => {
        render(<SignUpUser/>);
        const fullNameInput = await screen.findByPlaceholderText("Enter full name");
        const emailInput = await screen.findByPlaceholderText("Enter email");
        const passwordInput = await screen.findByPlaceholderText("Enter password");
        const confirmInput = await screen.findByPlaceholderText("Confirm password");

        fireEvent.blur(fullNameInput);
        fireEvent.blur(emailInput);
        fireEvent.blur(passwordInput);
        fireEvent.blur(confirmInput);

        const required = await screen.findAllByText("Required!");
        const invalidEmail = await screen.findByText("Provide a valid email");

        expect(required.length).toBe(3);
        required.forEach((el) => {
            expect(el).toBeInTheDocument();
        })
        expect(invalidEmail).toBeInTheDocument();
    });
});

describe("Send form", () => {
    const mockInputs = {
        fullName: "John Doe",
        email: "email@gmail.com",
        password: "qwerty123",
        confirm: "qwerty123"
    }

    it("should send form and display success message", async () => {
        render(<SignUpUser/>);
        const fullNameInput = await screen.findByPlaceholderText("Enter full name");
        const emailInput = await screen.findByPlaceholderText("Enter email");
        const passwordInput = await screen.findByPlaceholderText("Enter password");
        const confirmInput = await screen.findByPlaceholderText("Confirm password");

        const submitBtn = await screen.findByTestId("submit-button");

        fireEvent.change(fullNameInput, {target: {value: mockInputs.fullName}});
        fireEvent.change(emailInput, {target: {value: mockInputs.email}});
        fireEvent.change(passwordInput, {target: {value: mockInputs.password}});
        fireEvent.change(confirmInput, {target: {value: mockInputs.confirm}});

        fireEvent.submit(submitBtn);

        const successMsg = await screen.findByTestId("successMsg")

        expect(successMsg).toBeInTheDocument();
        expect(successMsg).toHaveTextContent("Success");
    });

    it("should submit a form with an error and display the error as a message", async () => {
        render(<SignUpUser/>);
        const submitBtn = await screen.findByTestId("submit-button");
        fireEvent.submit(submitBtn);

        const successMsg = await screen.findByTestId("submitErr")
        expect(successMsg).toBeInTheDocument();
    })
})

