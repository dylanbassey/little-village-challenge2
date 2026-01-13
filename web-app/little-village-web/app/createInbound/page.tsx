"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/button";
import { locations, paymentMethodEnum } from "@/interfaces/inboundRequest";
import { getTags } from "@/services/tagsService";
import { postInboundRequest } from "@/services/boundService";
import { useRouter } from "next/navigation";

export default function CreateInbound() {
  const router = useRouter();

  // Inbound request state
  const [inboundNotes, setInboundNotes] = useState("");
  const [inboundOrderNumber, setInboundOrderNumber] = useState("");
  const [inboundLocation, setInboundLocation] = useState("");
  const [inboundSupplier, setInboundSupplier] = useState("");
  const [inboundPaymentMethod, setInboundPaymentMethod] = useState("");
  const [inboundCategory, setInboundCategory] = useState("");
  const [inboundAmount, setInboundAmount] = useState<number | "">("");
  const [inboundAdvertisedLVEvent, setInboundAdvertisedLVEvent] =
    useState(false);
  const [inboundContact, setInboundContact] = useState("");
  const [inboundPostcode, setInboundPostcode] = useState("");
  const [inboundLVTransportRequired, setInboundLVTransportRequired] =
    useState(false);
  const [inboundExpectedDeliveryDate, setInboundExpectedDeliveryDate] =
    useState("");
  const [inboundThankYouSent, setInboundThankYouSent] = useState(false);
  const [inboundThankYouInitial, setInboundThankYouInitial] = useState("");
  const [inboundUsagePlan, setInboundUsagePlan] = useState("");
  const [inboundDescription, setInboundDescription] = useState("");

  // Tags
  const [tags, setTags] = useState<{ name: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  console.log(tags);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      location: inboundLocation,
      category: inboundCategory,
      supplierOrganisation: inboundSupplier,
      invoiceNumber: inboundOrderNumber,
      paymentMethod: inboundPaymentMethod,
      amount: inboundAmount === "" ? 0 : inboundAmount,
      description: inboundDescription,
      advertisedLvEvent: inboundAdvertisedLVEvent ? "Y" : "N",
      contact: inboundContact,
      notes: inboundNotes,
      postcode: inboundPostcode,
      lvTransportReq: inboundLVTransportRequired ? "Y" : "N",
      expDeliveryDate: inboundExpectedDeliveryDate,
      thankyouSent: inboundThankYouSent ? "Y" : "N",
      thankyouInitial: inboundThankYouInitial,
      usagePlan: inboundUsagePlan,
      tags: selectedTags.map((tag) => ({ name: tag })),
    };

    try {
      await postInboundRequest(payload);
      console.log("Inbound request submitted successfully");
    } catch (error) {
      console.error("Failed to submit inbound request", error);
    }
  };

  useEffect(() => {
    getTags().then(setTags).catch(console.error);
  }, []);

  const toggleTag = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    );
  };

  const createTag = () => {
    const trimmed = newTagName.trim();
    if (!trimmed) return;

    if (!tags.some((t) => t.name.toLowerCase() === trimmed.toLowerCase())) {
      setTags((prev) => [...prev, { name: trimmed }]);
    }

    setSelectedTags((prev) => [...prev, trimmed]);
    setNewTagName("");
    setIsAddingTag(false);
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        {/* Back */}
        <button onClick={() => router.back()} style={styles.backButton}>
          ← Back
        </button>

        <div style={styles.headerWrap}>
          <h1 style={styles.header}>Create Inbound Request</h1>
          <p style={styles.subheader}>
            Record items coming into Little Village so they can be sorted and
            shared with families who need them.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Inbound Details</h3>

            {/* ALL FIELDS BELOW ARE UNCHANGED */}
            <label style={styles.label}>
              Location
              <select
                value={inboundLocation}
                onChange={(e) => setInboundLocation(e.target.value)}
                style={styles.select}
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

            <label style={styles.label}>
              Inbound Category
              <input
                value={inboundCategory}
                onChange={(e) => setInboundCategory(e.target.value)}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              Description
              <textarea
                value={inboundDescription}
                onChange={(e) => setInboundDescription(e.target.value)}
                style={{ ...styles.input, minHeight: "60px" }}
              />
            </label>

            <label style={styles.label}>
              Supplier
              <input
                value={inboundSupplier}
                onChange={(e) => setInboundSupplier(e.target.value)}
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              Order Number
              <input
                value={inboundOrderNumber}
                onChange={(e) => setInboundOrderNumber(e.target.value)}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Payment Method
              <select
                value={inboundPaymentMethod}
                onChange={(e) => setInboundPaymentMethod(e.target.value)}
                style={styles.select}
                required
              >
                <option value="">Select payment method</option>
                {Object.values(paymentMethodEnum).map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Amount
              <input
                type="number"
                value={inboundAmount}
                onChange={(e) =>
                  setInboundAmount(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Advertised LV Event
              <input
                type="checkbox"
                checked={inboundAdvertisedLVEvent}
                onChange={(e) => setInboundAdvertisedLVEvent(e.target.checked)}
                style={{
                  marginLeft: "0.5rem",
                  alignSelf: "flex-start",
                  marginBottom: "0.5rem",
                }}
              />
            </label>

            <label style={styles.label}>
              Contact
              <input
                value={inboundContact}
                onChange={(e) => setInboundContact(e.target.value)}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Notes
              <textarea
                value={inboundNotes}
                onChange={(e) => setInboundNotes(e.target.value)}
                style={{ ...styles.input, minHeight: "60px" }}
              />
            </label>

            <label style={styles.label}>
              Postcode
              <input
                value={inboundPostcode}
                onChange={(e) => setInboundPostcode(e.target.value)}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              LV Transport Required
              <input
                type="checkbox"
                checked={inboundLVTransportRequired}
                onChange={(e) =>
                  setInboundLVTransportRequired(e.target.checked)
                }
                style={{
                  marginLeft: "0.5rem",
                  alignSelf: "flex-start",
                  marginBottom: "0.5rem",
                }}
              />
            </label>

            <label style={styles.label}>
              Expected Delivery Date
              <input
                type="date"
                value={inboundExpectedDeliveryDate}
                onChange={(e) => setInboundExpectedDeliveryDate(e.target.value)}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Thank You Sent
              <input
                type="checkbox"
                checked={inboundThankYouSent}
                onChange={(e) => setInboundThankYouSent(e.target.checked)}
                style={{
                  marginLeft: "0.5rem",
                  alignSelf: "flex-start",
                  marginBottom: "0.5rem",
                }}
              />
            </label>

            <label style={styles.label}>
              Thank You Initial
              <input
                value={inboundThankYouInitial}
                onChange={(e) => setInboundThankYouInitial(e.target.value)}
                style={styles.input}
                maxLength={1}
              />
            </label>

            <label style={styles.label}>
              Usage Plan
              <input
                value={inboundUsagePlan}
                onChange={(e) => setInboundUsagePlan(e.target.value)}
                style={styles.input}
              />
            </label>

            {/* Tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              {tags.map((tag) => {
                const selected = selectedTags.includes(tag.name);
                return (
                  <button
                    key={tag.name}
                    type="button"
                    onClick={() => toggleTag(tag.name)}
                    style={{
                      padding: "0.35rem 0.75rem",
                      borderRadius: "999px",
                      border: selected
                        ? "1px solid #2563eb"
                        : "1px solid #d1d5db",
                      background: selected ? "#2563eb" : "#f9fafb",
                      color: selected ? "#fff" : "#111",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    {tag.name}
                  </button>
                );
              })}

              {!isAddingTag && (
                <button
                  type="button"
                  onClick={() => setIsAddingTag(true)}
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: "999px",
                    border: "1px dashed #d1d5db",
                    background: "#fff",
                    fontSize: "0.85rem",
                    color: "#6b7280",
                  }}
                >
                  + Add tag
                </button>
              )}

              {isAddingTag && (
                <input
                  autoFocus
                  value={newTagName}
                  placeholder="Add new tag"
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      createTag();
                    }
                  }}
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: "999px",
                    border: "1px solid #2563eb",
                    fontSize: "0.85rem",
                    width: "120px",
                    color: "#111",
                  }}
                />
              )}
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
    padding: "2rem 1rem",
  },
  main: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "2.5rem",
    maxWidth: "720px",
    width: "100%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  backButton: {
    background: "none",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    marginBottom: "1rem",
    fontSize: "0.9rem",
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
    gap: "1.5rem",
  },
  section: {
    border: "1px solid #eef2f7",
    borderRadius: "14px",
    padding: "1.5rem",
  },
  sectionTitle: {
    margin: 0,
    marginBottom: "1rem",
    fontWeight: 600,
    color: "#374151",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    fontWeight: 500,
    color: "#222",
    marginTop: "1rem",
  },
  input: {
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    color: "#111",
  },
  select: {
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
  },
};
