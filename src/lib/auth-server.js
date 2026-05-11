import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_API_BASE, AUTH_TOKEN_COOKIE } from "./auth-config.js";
import { getDefaultRouteForRole } from "./auth-routes.js";

export async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${AUTH_API_BASE}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

export async function requireServerSession() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/");
  }

  return session;
}

export async function requireServerRole(role) {
  const session = await requireServerSession();

  if (session.user.role !== role) {
    redirect(getDefaultRouteForRole(session.user.role));
  }

  return session;
}
