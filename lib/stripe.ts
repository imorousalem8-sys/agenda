import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build_mode";

export const stripe = new Stripe(apiKey, {
  apiVersion: "2025-02-24.acacia" as any,
  typescript: true,
});

export const STRIPE_CONFIG = {
  priceIdPro: process.env.STRIPE_PRICE_ID_PRO || "price_1UAATM5dUonbIlKLLrMx8FH2",
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51UA9ia5dUonbIlKL64BU8CtTZilWqhmFBC1cS9bt8IK6aT4ufo7L9yQ9TVR4WATdpgyWFycZjinPBZ5JyL4nOCiq00LbuCSLeG",
};
