import { useState } from "react";

const plans = [
  {
    id: "free",
    label: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for side projects",
    cta: "Get started free",
    highlight: false,
    features: [
      { text: "3 projects", included: true },
      { text: "5GB storage", included: true },
      { text: "Custom domains", included: false },
      { text: "Analytics", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "pro",
    label: "Pro",
    price: { monthly: 19, yearly: 15 },
    description: "For growing teams",
    cta: "Start 14-day trial",
    highlight: true,
    badge: "Most popular",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "50GB storage", included: true },
      { text: "Custom domains", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    price: { monthly: 99, yearly: 79 },
    description: "For large organizations",
    cta: "Contact sales",
    highlight: false,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "500GB storage", included: true },
      { text: "SLA & priority support", included: true },
      { text: "SSO / SAML", included: true },
      { text: "Dedicated account manager", included: true },
    ],
  },
];

const CheckIcon = () => (
  <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs flex-shrink-0">
    ✓
  </span>
);

const CrossIcon = () => (
  <span className="w-4 h-4 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-xs flex-shrink-0">
    ✗
  </span>
);

const ProCheckIcon = () => (
  <span className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs flex-shrink-0">
    ✓
  </span>
);

export default function PricingCards() {
  const [billing, setBilling] = useState("monthly");

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center p-6 gap-8"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Billing toggle */}
      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${billing === "monthly" ? "text-zinc-900" : "text-zinc-400"}`}>
          Monthly
        </span>
        <button
          onClick={() => setBilling(b => b === "monthly" ? "yearly" : "monthly")}
          className="relative w-11 h-6 rounded-full transition-colors duration-200"
          style={{ background: billing === "yearly" ? "#6366f1" : "#d4d4d8" }}
        >
          <span
            className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
            style={{ transform: billing === "yearly" ? "translateX(20px)" : "translateX(0)" }}
          />
        </button>
        <span className={`text-sm font-medium flex items-center gap-1.5 ${billing === "yearly" ? "text-zinc-900" : "text-zinc-400"}`}>
          Yearly
          <span className="text-xs font-semibold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
            Save 20%
          </span>
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full mx-auto">
        {plans.map((plan) =>
          plan.highlight ? (
            <div
              key={plan.id}
              className="bg-indigo-600 rounded-2xl p-6 flex flex-col gap-5 relative"
              style={{ boxShadow: "0 0 0 2px #818cf8, 0 0 0 4px #e0e7ff" }}
            >
              {/* Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-amber-400 text-amber-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </span>
              </div>

              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-200 mb-3">
                  {plan.label}
                </span>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">
                    ${plan.price[billing]}
                  </span>
                  <span className="text-sm text-indigo-300 pb-1">/month</span>
                </div>
                <p className="text-sm text-indigo-200 mt-1">{plan.description}</p>
              </div>

              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2 text-sm text-indigo-100">
                    <ProCheckIcon />
                    {f.text}
                  </li>
                ))}
              </ul>

              <button className="w-full py-2.5 text-sm font-semibold rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 active:scale-95 transition-all duration-150">
                {plan.cta}
              </button>
            </div>
          ) : (
            <div
              key={plan.id}
              className="bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col gap-5 hover:border-zinc-400 transition-colors duration-200 sm:col-span-1 lg:col-span-1"
              style={plan.id === "enterprise" ? { gridColumn: undefined } : {}}
            >
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
                  {plan.label}
                </span>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-zinc-900">
                    ${plan.price[billing]}
                  </span>
                  <span className="text-sm text-zinc-400 pb-1">/month</span>
                </div>
                <p className="text-sm text-zinc-500 mt-1">{plan.description}</p>
              </div>

              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f.text}
                    className={`flex items-center gap-2 text-sm ${
                      f.included ? "text-zinc-600" : "text-zinc-400 line-through"
                    }`}
                  >
                    {f.included ? <CheckIcon /> : <CrossIcon />}
                    {f.text}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2.5 text-sm font-semibold rounded-xl transition-colors duration-150 ${
                  plan.id === "enterprise"
                    ? "bg-zinc-900 text-white hover:bg-zinc-700"
                    : "border border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
