import { useForm } from "react-hook-form";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import useUser from "../../authentication/useUser";
import useCenters from "../center/useCenters";
import Spinner from "../../../ui/Spinner";
import useCreateUser from "./useCreateUser";

function CreateUserForm() {
    const { user } = useUser();
    const { isLoading: isLoadingCenter, centers } = useCenters();
    const { isLoadingCreate, createNewUser } = useCreateUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm();

    let roleOptions = [
        { value: "student", label: "Student" },
        { value: "teacher", label: "Teacher" },
        {
            value: "admin",
            label: "Admin",
        },
    ];

    if (!user.roleDetails.isSuperAdmin)
        roleOptions = roleOptions.filter((option) => option.value !== "admin");

    function onSubmit(data) {
        createNewUser({ ...data }, { onSettled: reset() });
    }

    if (isLoadingCenter) return <Spinner />;

    let centerOptions = centers.map((center) => ({
        value: center._id,
        label: center.name,
    }));

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please enter a valid email address",
                        },
                    })}
                />
            </FormRow>
            <FormRow label="Role" error={errors?.role?.message}>
                <Select
                    id="role"
                    options={roleOptions}
                    style={{ width: "70%" }}
                    {...register("role", {
                        required: "This field is required",
                    })}
                />
            </FormRow>
            <FormRow label="Center" error={errors?.center?.message}>
                <Select
                    id="center"
                    options={centerOptions}
                    style={{ width: "70%" }}
                    {...register("center", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message:
                                "Please enter a valid password at least 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            value === getValues().password ||
                            "Passwords do not match",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    disabled={isLoadingCreate}
                    variation="secondary"
                    type="reset"
                >
                    Cancel
                </Button>
                <Button disabled={isLoadingCreate}>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default CreateUserForm;
