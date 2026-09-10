/**
 * LELAN TECHNOLOGY · Login Page
 *
 * Phase 1D-G3 — Server component shell.
 *
 * Route: /login
 *
 * This is a server component — no "use client" directive.
 * The interactive form is in LoginForm.tsx (client component).
 */
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <LoginForm />
    </div>
  );
}
