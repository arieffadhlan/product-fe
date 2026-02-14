import { valibotResolver } from "@hookform/resolvers/valibot";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { InputPassword } from "@/components/input-password";
import { getErrorMessage } from "@/utils/error";
import { useLogin } from "../api/login";
import { LoginSchema, type LoginSchemaType } from "../auth-validation";

export default function LoginForm() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: valibotResolver(LoginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    shouldUnregister: false,
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const mutation = useLogin();
  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await mutation.mutateAsync({ data });
    } catch (error) {
      setError("username", { message: getErrorMessage(error) }, { shouldFocus: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[480px] w-full pt-6 space-y-6 rounded-xl">
      <Input
        icon={User}
        placeholder="Input username"
        label="Username"
        error={errors.username?.message}
        {...register("username")}
      />
      <InputPassword
        placeholder="Input password"
        label="Password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button
        size="lg"
        text="Submit"
        type="submit"
        className="mt-2"
        fullWidth
        load={mutation.isPending}
        disabled={mutation.isPending}
      />
    </form>
  );
}
