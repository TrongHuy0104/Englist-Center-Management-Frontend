import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "./useLogin";
import { validateEmail } from "../../utils/helpers";
import { Link } from "react-router-dom";

const Text = styled.p`
    font-size: 1.4rem;
    text-align: center;
    margin: 1rem 0;
`;
const TextLink = styled(Link)`
    font-size: 1.4rem;
    margin: 1rem 0;
    color: var(--color-blue-700);
`;

function LoginForm() {
    const { isLoadingLogin, login } = useLogin();

    const [inputFields, setInputFields] = useState({
        email: "admin4@example.com",
        password: "hashedpassword13",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validateValues = (inputValues) => {
        let errors = {};
        if (!inputValues.email) {
            errors.email = "Email is required";
        }
        if (inputValues.email && !validateEmail(inputValues.email)) {
            errors.email = "Email is not correct format";
        }
        if (!inputValues.password) {
            errors.password = "Password is required";
        }
        if (inputValues.password && inputValues.password.length < 8) {
            errors.password = "Password is too short";
        }
        return errors;
    };
    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validateValues(inputFields));
        setSubmitting(true);
    }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            login(inputFields, {
                onSettled: () => {
                    setInputFields({ email: "", password: "" });
                },
            });
        }
    }, [errors, submitting]);

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address" error={errors?.email}>
                <Input
                    type="text"
                    id="email"
                    name="email"
                    isError={errors?.email}
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={inputFields.email}
                    onChange={handleChange}
                />
            </FormRowVertical>
            <FormRowVertical label="Password" error={errors?.password}>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    isError={errors?.password}
                    autoComplete="current-password"
                    value={inputFields.password}
                    onChange={handleChange}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button style={{ marginTop: "0.8rem" }} size="large">
                    {isLoadingLogin ? <SpinnerMini /> : "Login"}
                </Button>
            </FormRowVertical>
            <Text>
                Don't have an account?{" "}
                <TextLink to="/register">Sign up</TextLink>
            </Text>
        </Form>
    );
}

export default LoginForm;
