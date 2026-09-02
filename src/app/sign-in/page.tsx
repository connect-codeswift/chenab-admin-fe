import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminSignInForm } from "@/components/admin/admin-sign-in-form";

export const metadata: Metadata = {
  title: "Sign in | Chenab Valley Rice Admin",
  description: "Sign in to the Chenab Valley Rice admin portal.",
  robots: { index: false, follow: false },
};

export default function AdminSignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center auth-aurora px-6 py-12">
      <section
        aria-labelledby="admin-sign-in-heading"
        className="flex w-full max-w-md rounded bg-surface-raised p-6"
      >
        <div className="flex w-full flex-col items-start">
          <p className="text-caption tracking-wider text-ink-subtle uppercase">
            Admin portal
          </p>

          <h1
            id="admin-sign-in-heading"
            className="pt-3 text-h2 text-ink-primary"
          >
            Sign in
          </h1>

          <div className="w-full pt-8">
            <Suspense fallback={null}>
              <AdminSignInForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
