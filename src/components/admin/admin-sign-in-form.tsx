"use client";

import { useForm } from "react-hook-form";
import { controlClass, FormField } from "@/components/ui/form-field";

export type AdminCredentials = {
  email: string;
  password: string;
};

export type AdminSignInFormProps = Readonly<{
  onSubmit?: (credentials: AdminCredentials) => Promise<void> | void;
}>;

// The admin submit button is its own Figma component (node 181:13339) — a
// 14px label with 20/12 padding — so it does not reuse the `btn` utility that
// is sized for the storefront. Hover, focus and motion stay in step with it.
const submitClass =
  "mt-2 w-full cursor-pointer rounded bg-brand-accent px-5 py-3 text-body-sm font-medium text-surface-base transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60";

const submitLabelByState: Record<"idle" | "pending", string> = {
  idle: "Sign in",
  pending: "Signing in…",
};

export function AdminSignInForm(props: Readonly<AdminSignInFormProps>) {
  const { onSubmit } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminCredentials>({
    defaultValues: { email: "", password: "" },
  });

  // The admin auth endpoint does not exist yet — the caller owns submission.
  async function submit(credentials: AdminCredentials) {
    await onSubmit?.(credentials);
  }

  return (
    <form
      className="flex w-full flex-col gap-4"
      noValidate
      onSubmit={handleSubmit(submit)}
    >
      <FormField
        label="Email"
        htmlFor="admin-email"
        error={errors.email?.message}
      >
        <input
          id="admin-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          className={controlClass}
          {...register("email", {
            required: "Enter your email address.",
          })}
        />
      </FormField>

      <FormField
        label="Password"
        htmlFor="admin-password"
        error={errors.password?.message}
      >
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          className={controlClass}
          {...register("password", { required: "Enter your password." })}
        />
      </FormField>

      <button type="submit" disabled={isSubmitting} className={submitClass}>
        {submitLabelByState[isSubmitting ? "pending" : "idle"]}
      </button>
    </form>
  );
}
