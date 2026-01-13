"use client";
import React, { useState } from "react";
import Button from "@/components/button";
import { weightCategories } from "@/constants/weightCatagories";
import { locations } from "@/interfaces/inboundRequest";
import { useRouter } from "next/navigation";
import { postOutboundRequest } from "@/services/boundService";

export default function CreateWeight() {
  const router = useRouter();

  const [outboundEstimatedDispatchDate, setOutboundEstimatedDispatchDate] =
    useState("");
  const [outboundLocation, setOutboundLocation] = useState("");
  const [outboundCategory, setOutboundCategory] = useState("");
  const [outboundOrganisation, setOutboundOrganisation] = useState("");
  const [outboundPaymentReceived, setOutboundPaymentReceived] = useState(""); // will be number
  const [outboundDeliveryAddress, setOutboundDeliveryAddress] = useState("");
  const [outboundDeliveryMethod, setOutboundDeliveryMethod] = useState("");
  const [outboundContact, setOutboundContact] = useState("");
  const [outboundCompleted, setOutboundCompleted] = useState(false);
  // Items array state
  const [items, setItems] = useState([{ category: "", quantity: "" }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Build the request body as specified
    const requestBody = {
      estDispatchDate: outboundEstimatedDispatchDate,
      location: outboundLocation,
      category: outboundCategory,
      organisation: outboundOrganisation,
      paymentReceived:
        outboundPaymentReceived === ""
          ? undefined
          : Number(outboundPaymentReceived),
      deliveryAddress: outboundDeliveryAddress,
      deliveryMethod: outboundDeliveryMethod,
      contact: outboundContact,
      completed: outboundCompleted ? "Y" : "N",
      items: items
        .filter((item) => item.category && item.quantity)
        .map((item) => ({
          category: item.category,
          quantity: Number(item.quantity),
        })),
    };
    console.log(requestBody);

    try {
      await postOutboundRequest(requestBody);
      console.log("Outbound request submitted successfully");
    } catch (error) {
      console.error("Failed to submit outbound request", error);
    }
  };

  // Handlers for items array
  const handleItemChange = (idx: number, field: string, value: string) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };
  const addItem = () =>
    setItems((prev) => [...prev, { category: "", quantity: "" }]);
  const removeItem = (idx: number) =>
    setItems((prev) => prev.filter((_, i) => i !== idx));

  return (
    <div style={styles.container as React.CSSProperties}>
      <main style={styles.main as React.CSSProperties}>
        {/* Back */}
        <button
          type="button"
          onClick={() => router.back()}
          style={styles.backButton as React.CSSProperties}
        >
          ← Back
        </button>

        <div style={styles.headerWrap as React.CSSProperties}>
          <h1 style={styles.header as React.CSSProperties}>
            Create Outbound Request
          </h1>
          <p style={styles.subheader as React.CSSProperties}>
            Record items leaving Little Village so deliveries reach the right
            families.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={styles.form as React.CSSProperties}
        >
          <div
            style={{
              background: "#fef9c3",
              border: "2px solid #fde047",
              borderRadius: "12px",
              padding: "1.5rem",
              marginTop: "1rem",
              marginBottom: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <h3 style={{ color: "#b45309", margin: 0 }}>Outbound Request</h3>

            <label style={styles.label as React.CSSProperties}>
              Estimated Dispatch Date
              <input
                type="date"
                value={outboundEstimatedDispatchDate}
                onChange={(e) =>
                  setOutboundEstimatedDispatchDate(e.target.value)
                }
                style={styles.input as React.CSSProperties}
              />
            </label>

            <label style={styles.label as React.CSSProperties}>
              Location
              <select
                value={outboundLocation}
                onChange={(e) => setOutboundLocation(e.target.value)}
                style={styles.select as React.CSSProperties}
                required
              >
                <option value="">Select location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label as React.CSSProperties}>
              Category
              <select
                value={outboundCategory}
                onChange={(e) => setOutboundCategory(e.target.value)}
                style={styles.select as React.CSSProperties}
                required
              >
                {weightCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label as React.CSSProperties}>
              Organisation
              <input
                type="text"
                value={outboundOrganisation}
                onChange={(e) => setOutboundOrganisation(e.target.value)}
                placeholder="Organisation"
                style={styles.input as React.CSSProperties}
              />
            </label>

            <label style={styles.label as React.CSSProperties}>
              Payment Received (£)
              <input
                type="number"
                value={outboundPaymentReceived}
                onChange={(e) => setOutboundPaymentReceived(e.target.value)}
                placeholder="Amount received"
                style={styles.input as React.CSSProperties}
                min={0}
              />
            </label>

            <label style={styles.label as React.CSSProperties}>
              Delivery Address
              <input
                type="text"
                value={outboundDeliveryAddress}
                onChange={(e) => setOutboundDeliveryAddress(e.target.value)}
                placeholder="Delivery Address"
                style={styles.input as React.CSSProperties}
              />
            </label>

            <label style={styles.label as React.CSSProperties}>
              Delivery Method
              <input
                type="text"
                value={outboundDeliveryMethod}
                onChange={(e) => setOutboundDeliveryMethod(e.target.value)}
                placeholder="Delivery Method"
                style={styles.input as React.CSSProperties}
              />
            </label>

            <label style={styles.label as React.CSSProperties}>
              Contact
              <input
                type="text"
                value={outboundContact}
                onChange={(e) => setOutboundContact(e.target.value)}
                placeholder="Contact Name"
                style={styles.input as React.CSSProperties}
              />
            </label>

            <label style={styles.label as React.CSSProperties}>
              Completed
              <input
                type="checkbox"
                checked={outboundCompleted}
                onChange={(e) => setOutboundCompleted(e.target.checked)}
                style={{ marginLeft: "0.5rem", alignSelf: "flex-start" }}
              />
            </label>

            {/* Items array */}
            <div style={{ marginTop: "1rem" }}>
              <label style={{ ...styles.label, marginBottom: 0 }}>Items</label>
              {items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Category"
                    value={item.category}
                    onChange={(e) =>
                      handleItemChange(idx, "category", e.target.value)
                    }
                    style={{
                      ...styles.input,
                      width: "160px",
                      "::placeholder": { color: "#9ca3af" },
                      color: "#222",
                    }}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(idx, "quantity", e.target.value)
                    }
                    style={{
                      ...styles.input,
                      width: "100px",
                      "::placeholder": { color: "#9ca3af" },
                      color: "#222",
                    }}
                    min={0}
                    required
                  />
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        lineHeight: 1,
                      }}
                      aria-label="Remove item"
                    >
                      &minus;
                    </button>
                  )}
                  {idx === items.length - 1 && (
                    <button
                      type="button"
                      onClick={addItem}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#2563eb",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        lineHeight: 1,
                      }}
                      aria-label="Add item"
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </main>
    </div>
  );
}

/* =================== STYLES =================== */

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f7faf5",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "2rem 1rem",
  },

  main: {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "640px",
  },

  backButton: {
    background: "none",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },

  headerWrap: {
    textAlign: "center",
    marginBottom: "2rem",
  },

  header: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#2f3e2f",
    margin: 0,
  },

  subheader: {
    marginTop: "0.75rem",
    color: "#6b7b6b",
    fontSize: "0.95rem",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },

  label: {
    fontWeight: 500,
    color: "#222",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },

  input: {
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
  },

  select: {
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
  },
};
