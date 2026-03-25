import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";

const faqList = [
  {
    q: "How do I track my order?",
    a: "Go to the Track Order page and enter your Order ID and phone number to get real-time updates.",
  },
  {
    q: "Can I return a product?",
    a: "Yes! We offer 7-day hassle-free returns. Just contact us and we'll arrange a free pickup.",
  },
  {
    q: "Is Cash on Delivery available?",
    a: "Yes, COD is available across India. Simply choose 'Cash on Delivery' at checkout.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 4-7 business days. Express delivery is available in select cities.",
  },
  {
    q: "Are the products genuine?",
    a: "Absolutely! We source directly from verified manufacturers with full quality checks.",
  },
];

export default function ContactEcomPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "#0A0F1C" }}>
      <div className="mx-auto max-w-5xl">
        <h1 className="section-title mb-2 text-center">Get in Touch</h1>
        <p className="text-sm text-center mb-8" style={{ color: "#9CA3AF" }}>
          We&apos;re here to help. Reach out anytime!
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            {
              icon: Mail,
              label: "Email Us",
              value: "support@nexcartify.in",
              sub: "Response within 2 hours",
              color: "#6366F1",
            },
            {
              icon: Phone,
              label: "Call Us",
              value: "+91 88000 00000",
              sub: "Mon-Sat 9AM to 7PM IST",
              color: "#22C55E",
            },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: "Chat with us",
              sub: "Instant support available",
              color: "#F97316",
            },
          ].map(({ icon: Icon, label, value, sub, color }) => (
            <div key={label} className="glass-card p-5 text-center">
              <div
                className="w-11 h-11 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{
                  background: `${color}20`,
                  border: `1px solid ${color}40`,
                }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <p className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>
                {label}
              </p>
              <p className="text-sm mt-1" style={{ color }}>
                {value}
              </p>
              <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>
                {sub}
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {sent ? (
            <div
              className="p-6 rounded-[14px] flex flex-col items-center justify-center text-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              data-ocid="contact.success_state"
            >
              <CheckCircle size={40} style={{ color: "#22C55E" }} />
              <h3
                className="text-lg font-semibold mt-3 mb-2"
                style={{ color: "#F9FAFB" }}
              >
                Message Sent!
              </h3>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>
                We&apos;ll get back to you within 2 hours.
              </p>
            </div>
          ) : (
            <div
              className="p-6 rounded-[14px]"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h3
                className="text-base font-semibold mb-4"
                style={{ color: "#F9FAFB" }}
              >
                Send a Message
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium mb-1"
                    style={{ color: "#9CA3AF" }}
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Rahul Kumar"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 rounded-[10px] text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#F9FAFB",
                    }}
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium mb-1"
                    style={{ color: "#9CA3AF" }}
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="rahul@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 rounded-[10px] text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#F9FAFB",
                    }}
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium mb-1"
                    style={{ color: "#9CA3AF" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-[10px] text-sm outline-none resize-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#F9FAFB",
                    }}
                    data-ocid="contact.textarea"
                  />
                </div>
                <button
                  type="button"
                  className="w-full cta-button py-3 flex items-center justify-center gap-2"
                  onClick={() => setSent(true)}
                  data-ocid="contact.submit_button"
                >
                  <Send size={15} /> Send Message
                </button>
              </div>
            </div>
          )}

          <div>
            <h3
              className="text-base font-semibold mb-4"
              style={{ color: "#F9FAFB" }}
            >
              Frequently Asked Questions
            </h3>
            <div className="space-y-2">
              {faqList.map((faq, i) => (
                <div
                  key={faq.q}
                  className="rounded-[10px] overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  data-ocid={`contact.item.${i + 1}`}
                >
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-3 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-ocid="contact.toggle"
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#F9FAFB" }}
                    >
                      {faq.q}
                    </span>
                    {openFaq === i ? (
                      <ChevronUp size={14} style={{ color: "#6366F1" }} />
                    ) : (
                      <ChevronDown size={14} style={{ color: "#9CA3AF" }} />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-3 pb-3">
                      <p className="text-xs" style={{ color: "#9CA3AF" }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
