import { NextRequest, NextResponse } from "next/server";
import { requireAuth, AuthenticatedUser } from "./auth-guard";
import { apiError } from "./api-response";

export interface HandlerContext<TParams = Record<string, string>> {
  user?: AuthenticatedUser;
  params?: TParams;
}

export interface ApiHandlerOptions {
  requireAuth?: boolean;
}

/**
 * Higher-order function pour sécuriser et uniformiser les gestionnaires de routes API.
 */
export function createApiHandler<TParams = Record<string, string>>(
  options: ApiHandlerOptions,
  handler: (req: NextRequest, ctx: HandlerContext<TParams>) => Promise<NextResponse>
) {
  return async (req: NextRequest, routeContext?: { params?: Promise<TParams> | TParams }) => {
    try {
      const ctx: HandlerContext<TParams> = {};

      if (options.requireAuth) {
        ctx.user = await requireAuth();
      }

      if (routeContext?.params) {
        ctx.params = await Promise.resolve(routeContext.params);
      }

      return await handler(req, ctx);
    } catch (error) {
      return apiError(error);
    }
  };
}
