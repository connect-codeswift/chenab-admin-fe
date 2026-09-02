"use client";

import { Icon } from "@iconify/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { controlClass, FormField } from "@/components/ui/form-field";
import { useLogin } from "@/hooks/use-login";
import { ApiError } from "@/lib/api/types";

export type AdminCredentials = {
  email: string;
  password: string;
};

const submitClass =
  "mt-2 w-full cursor-pointer rounded bg-brand-accent px-5 py-3 text-body-sm font-medium text-surface-base transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60";

const passwordControlClass = `${controlClass} w-full pr-11`;

const submitLabelByState: Record<"idle" | "pending", string> = {
  idle: "Sign in",
  pending: "Signing in…",
};

function resolveLoginError(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Unable to sign in. Please try again.";
}

function resolveNextPath(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

export function AdminSignInForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const loginMutation = useLogin({
    onSuccess: () => {
      // Full navigation so middleware sees the new auth cookie immediately.
      router.push(resolveNextPath(searchParams.get("next")));
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminCredentials>({
    defaultValues: { email: "", password: "" },
  });

  const isPending = loginMutation.isPending;
  const serverError = loginMutation.error
    ? resolveLoginError(loginMutation.error)
    : null;

  async function submit(credentials: AdminCredentials) {
    loginMutation.reset();
    await loginMutation.mutateAsync(credentials);
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
          placeholder="admin@chenabvalleyrice.com"
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
        <span className="relative block">
          <input
            id="admin-password"
            type={passwordVisible ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={Boolean(errors.password)}
            className={passwordControlClass}
            {...register("password", { required: "Enter your password." })}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible((current) => !current)}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            aria-pressed={passwordVisible}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded text-ink-subtle transition-colors hover:text-ink-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            <Icon
              icon={passwordVisible ? "mdi:eye-off-outline" : "mdi:eye-outline"}
              className="size-5"
              aria-hidden
            />
          </button>
        </span>
      </FormField>

      {serverError ? (
        <p role="alert" className="text-caption text-state-critical">
          {serverError}
        </p>
      ) : null}

      <button type="submit" disabled={isPending} className={submitClass}>
        {submitLabelByState[isPending ? "pending" : "idle"]}
      </button>
    </form>
  );
}
