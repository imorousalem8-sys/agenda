import { NextResponse } from "next/server";
import { AppError } from "./errors";

/**
 * Utilitaires pour construire des réponses API uniformes.
 */

export function apiSuccess<T extends Record<string, unknown> | unknown[] | null>(
  data: T,
  status = 200,
  headers?: HeadersInit
): NextResponse {
  // Si data est déjà un objet avec les clés attendues par le client ({ events }, { tasks }, etc.),
  // on le sérialise directement pour préserver les contrats existants
  return NextResponse.json(data, { status, headers });
}

export function apiCreated<T extends Record<string, unknown> | unknown[]>(
  data: T,
  headers?: HeadersInit
): NextResponse {
  return apiSuccess(data, 201, headers);
}

export function apiError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        ...(error.details ? { details: error.details } : {}),
      },
      { status: error.statusCode }
    );
  }

  // Erreur de validation Zod si non interceptée
  if (error && typeof error === "object" && "issues" in error) {
    const issues = (error as { issues: Array<{ message: string; path: Array<string | number> }> }).issues;
    const firstMessage = issues?.[0]?.message || "Données non conformes";
    return NextResponse.json(
      {
        error: firstMessage,
        code: "VALIDATION_ERROR",
        details: issues,
      },
      { status: 400 }
    );
  }

  // Erreur JS standard inconnue
  const message = error instanceof Error ? error.message : "Une erreur interne est survenue";
  console.error("[API Error]", error);

  return NextResponse.json(
    {
      error: message,
      code: "INTERNAL_SERVER_ERROR",
    },
    { status: 500 }
  );
}
