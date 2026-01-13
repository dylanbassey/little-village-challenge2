"use client";
import React, { use, useEffect, useState } from "react";
import Button from "@/components/button";
import { weightCategories } from "@/constants/weightCatagories";
import { ContainerType } from "@/interfaces/containerInterface";
import {
  InboundRequest,
  locations,
  paymentMethodEnum,
} from "@/interfaces/inboundRequest";
import { getTags } from "@/services/tagsService";
import { useRouter } from "next/navigation";
import {
  getInboundRequests,
  getOutboundRequests,
  postWeightRecord,
} from "@/services/boundService";
import { OutboundRequest } from "@/interfaces/outboundRequest";

export default function CreateWeight() {
  const router = useRouter();

  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [childName, setChildName] = useState("");
  const [date, setDate] = useState("");
  const [ageGroup, setAgeGroup] = useState(weightCategories[0]);
  // containers: array of container type names
  const [containers, setContainers] = useState<string[]>([""]);
  // grossWeights: array of grossWeight values for each container
  const [grossWeights, setGrossWeights] = useState<string[]>([""]);

  // Request section state
  const [requestType, setRequestType] = useState<
    "none" | "inbound" | "outbound"
  >("none");

  const [inbounds, setInbounds] = useState<InboundRequest[]>([]);
  const [outbounds, setOutbounds] = useState<OutboundRequest[]>([]);
  const [attachId, setAttachId] = useState<number | null>(null);

  const handleContainerChange = (idx: number, value: string) => {
    const updated = [...containers];
    updated[idx] = value;
    setContainers(updated);
  };

  const handleGrossWeightChange = (idx: number, value: string) => {
    const updated = [...grossWeights];
    updated[idx] = value;
    setGrossWeights(updated);
  };

  const addContainer = () => {
    setContainers([...containers, ""]);
    setGrossWeights([...grossWeights, ""]);
  };

  const removeContainer = (idx: number) => {
    setContainers(containers.filter((_, i) => i !== idx));
    setGrossWeights(grossWeights.filter((_, i) => i !== idx));
  };

  console.log(containers, "containers");

  const buildContainersPayload = () => {
    // Only include containers with a type selected
    return containers
      .map((containerType, idx) => {
        if (!containerType) return null;
        const containerObj =
          ContainerType[containerType as keyof typeof ContainerType];
        return {
          typeId: containerObj?.id || containerType,
          grossWeight: Number(grossWeights[idx]) || 0,
        };
      })
      .filter(Boolean);
  };

  const buildRequestBody = () => {
    console.log(buildContainersPayload(), "containers payload");
    const baseBody = {
      category: ageGroup,
      name: childName,
      containers: buildContainersPayload(),
      entryDate: date,
    };

    // Conditionally attach request ID
    if (attachId !== null) {
      if (requestType === "inbound") {
        return {
          ...baseBody,
          inboundId: String(attachId),
        };
      }

      if (requestType === "outbound") {
        return {
          ...baseBody,
          outboundId: String(attachId),
        };
      }
    }

    // No attachment
    return baseBody;
  };

  const fetchInbounds = async () => {
    try {
      const response = await getInboundRequests();
      setInbounds(response);
      console.log("Inbounds:", response);
    } catch (error) {
      console.error("Error fetching inbounds:", error);
    }
  };

  const fetchOutbounds = async () => {
    try {
      const response = await getOutboundRequests();
      setOutbounds(response);
      console.log("Outbounds:", response);
    } catch (error) {
      console.error("Error fetching outbounds:", error);
    }
  };

  useEffect(() => {
    fetchInbounds();
    fetchOutbounds();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody = buildRequestBody();

    console.log("Submitting weight record:", requestBody);

    await postWeightRecord(requestBody);

    router.back();
  };

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
            Create Weight Record
          </h1>
          <p style={styles.subheader as React.CSSProperties}>
            A small record that helps us understand what’s coming in and where
            it needs to go.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={styles.form as React.CSSProperties}
        >
          {/* Weight record section */}
          <div style={styles.sectionCard as React.CSSProperties}>
            <h3 style={styles.sectionTitle as React.CSSProperties}>
              Weight Record
            </h3>

            <label style={styles.label as React.CSSProperties}>
              Name
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Enter name"
                style={styles.input as React.CSSProperties}
                required
              />
            </label>

            <div style={styles.row2 as React.CSSProperties}>
              <label style={styles.label as React.CSSProperties}>
                Date
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={styles.input as React.CSSProperties}
                  required
                />
              </label>

              <label style={styles.label as React.CSSProperties}>
                Category
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
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
            </div>

            <label style={styles.label as React.CSSProperties}>
              Containers
              {containers.map((container, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <select
                    value={container}
                    onChange={(e) => handleContainerChange(idx, e.target.value)}
                    style={styles.select as React.CSSProperties}
                    required
                  >
                    <option value="">Select container type</option>
                    {Object.values(ContainerType).map((typeObj) => (
                      <option key={typeObj.name} value={typeObj.name}>
                        {typeObj.name} ({typeObj.weight}kg)
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="Gross Weight"
                    value={grossWeights[idx] || ""}
                    onChange={(e) =>
                      handleGrossWeightChange(idx, e.target.value)
                    }
                    style={{
                      ...styles.input,
                      width: "120px",
                    }}
                    required
                  />

                  {containers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContainer(idx)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        lineHeight: 1,
                      }}
                      aria-label="Remove container"
                    >
                      &minus;
                    </button>
                  )}

                  {idx === containers.length - 1 && (
                    <button
                      type="button"
                      onClick={addContainer}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#2563eb",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        lineHeight: 1,
                      }}
                      aria-label="Add container"
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </label>
          </div>

          {/* Collapsible Request Section */}
          <div style={{ margin: "2rem 0" }}>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "0.5rem",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setRequestType(requestType === "inbound" ? "none" : "inbound")
                }
                style={{
                  background: requestType === "inbound" ? "#2563eb" : "#f1f5f9",
                  color: requestType === "inbound" ? "#fff" : "#2563eb",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  flex: 1,
                  transition: "background 0.2s",
                }}
              >
                {requestType === "inbound"
                  ? "Attach Inbound Request"
                  : "Attach Inbound Request"}
              </button>

              <button
                type="button"
                onClick={() =>
                  setRequestType(
                    requestType === "outbound" ? "none" : "outbound"
                  )
                }
                style={{
                  background:
                    requestType === "outbound" ? "#2563eb" : "#f1f5f9",
                  color: requestType === "outbound" ? "#fff" : "#2563eb",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  flex: 1,
                  transition: "background 0.2s",
                }}
              >
                {requestType === "outbound"
                  ? "Attach Outbound Request"
                  : "Attach Outbound Request"}
              </button>
            </div>

            {/* Show inbound list if Attach Inbound Request is active */}
            {requestType === "inbound" && inbounds.length > 0 && (
              <div
                style={{
                  background: "#e0f2fe",
                  border: "1px solid #38bdf8",
                  borderRadius: "10px",
                  padding: "1rem",
                  marginTop: "1rem",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    marginBottom: "0.75rem",
                    color: "#2563eb",
                  }}
                >
                  Available Inbound Requests
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {inbounds.map((inb) => (
                    <li
                      key={inb.id}
                      style={{
                        background: "#fff",
                        border: "1px solid #bae6fd",
                        borderRadius: "8px",
                        marginBottom: "0.75rem",
                        padding: "0.75rem 1rem",
                        boxShadow: "0 2px 8px rgba(56,189,248,0.06)",
                      }}
                    >
                      <div style={{ fontWeight: 600, color: "#2563eb" }}>
                        {inb.location} &mdash; {inb.category}
                      </div>
                      <div
                        style={{
                          fontSize: "0.97em",
                          color: "#374151",
                          margin: "0.25rem 0",
                        }}
                      >
                        <span>Supplier: {inb.supplierOrganisation}</span> |{" "}
                        <span>Contact: {inb.contact}</span>
                      </div>
                      <div style={{ fontSize: "0.97em", color: "#374151" }}>
                        <span>
                          Delivery:{" "}
                          {inb.expDeliveryDate
                            ? new Date(inb.expDeliveryDate).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "0.97em",
                          color: "#374151",
                          marginTop: "0.25rem",
                        }}
                      >
                        <span>Notes: {inb.notes}</span>
                      </div>
                      <div style={{ fontSize: "0.97em", color: "#374151" }}>
                        <span>Usage Plan: {inb.usagePlan}</span>
                      </div>
                      <div style={{ fontSize: "0.97em", color: "#374151" }}>
                        <span>Description: {inb.description}</span>
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <Button
                          variant="danger"
                          onClick={() => setAttachId(inb.id)}
                        >
                          Attach
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Show outbound list if Attach Outbound Request is active */}
            {requestType === "outbound" && outbounds.length > 0 && (
              <div
                style={{
                  background: "#fef9c3",
                  border: "1px solid #fde047",
                  borderRadius: "10px",
                  padding: "1rem",
                  marginTop: "1rem",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    marginBottom: "0.75rem",
                    color: "#b45309",
                  }}
                >
                  Available Outbound Requests
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {outbounds.map((outb) => (
                    <li
                      key={outb.id}
                      style={{
                        background: "#fff",
                        border: "1px solid #fde68a",
                        borderRadius: "8px",
                        marginBottom: "0.75rem",
                        padding: "0.75rem 1rem",
                        boxShadow: "0 2px 8px rgba(253,230,138,0.06)",
                      }}
                    >
                      <div style={{ fontWeight: 600, color: "#b45309" }}>
                        {outb.location} &mdash; {outb.category}
                      </div>
                      <div
                        style={{
                          fontSize: "0.97em",
                          color: "#374151",
                          margin: "0.25rem 0",
                        }}
                      >
                        <span>Organisation: {outb.organisation}</span> |{" "}
                        <span>Contact: {outb.contact}</span>
                      </div>
                      <div style={{ fontSize: "0.97em", color: "#374151" }}>
                        <span>
                          Completed: {outb.completed === "Y" ? "Yes" : "No"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </main>
    </div>
  );
}

const styles = {
  // Warmer, calmer "Little Village" vibe background
  container: {
    minHeight: "100vh",
    background: "#f7faf5",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "2rem 1rem",
  },

  // Main card feels friendly, not "admin"
  main: {
    background: "#fff",
    padding: "2.25rem 2.25rem",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "720px",
  },

  backButton: {
    background: "transparent",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: "0.95rem",
    padding: 0,
    marginBottom: "1rem",
  },

  headerWrap: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },

  header: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#2f3e2f",
    margin: 0,
  },

  subheader: {
    marginTop: "0.75rem",
    marginBottom: 0,
    color: "#6b7b6b",
    fontSize: "0.95rem",
    lineHeight: 1.5,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },

  // Only used for the top "Weight Record" grouping — does not change your inner field styles
  sectionCard: {
    background: "#ffffff",
    border: "1px solid #eef2f7",
    borderRadius: "14px",
    padding: "1.25rem",
  },

  sectionTitle: {
    margin: 0,
    marginBottom: "1rem",
    color: "#374151",
    fontSize: "1.05rem",
    fontWeight: 600,
  },

  row2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
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
