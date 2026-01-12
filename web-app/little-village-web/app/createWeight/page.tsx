"use client";
import React, { useState } from "react";
import Button from "@/components/button";
import { weightCategories } from "@/constants/weightCatagories";
import { ContainerType } from "@/interfaces/containerInterface";
import { locationEnum, locations } from "@/interfaces/inboundRequest";

export default function CreateWeight() {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [childName, setChildName] = useState("");
  const [date, setDate] = useState("");
  const [ageGroup, setAgeGroup] = useState(weightCategories[0]);
  const [itemType, setItemType] = useState("clothes");
  const [containers, setContainers] = useState<string[]>([""]);

  // Request section state
  const [requestType, setRequestType] = useState<
    "none" | "inbound" | "outbound"
  >("none");

  // Inbound request state
  const [inboundType, setInboundType] = useState("");
  const [inboundNotes, setInboundNotes] = useState("");
  const [inboundUrgency, setInboundUrgency] = useState("normal");
  const [inboundDate, setInboundDate] = useState("");
  const [inboundContact, setInboundContact] = useState("");
  const [inboundLocation, setInboundLocation] = useState("");
  const [inboundSupplier, setInboundSupplier] = useState("");

  // Outbound request state
  const [outboundType, setOutboundType] = useState("");
  const [outboundNotes, setOutboundNotes] = useState("");
  const [outboundUrgency, setOutboundUrgency] = useState("normal");
  const [outboundDate, setOutboundDate] = useState("");
  const [outboundDriver, setOutboundDriver] = useState("");
  const [outboundDestination, setOutboundDestination] = useState("");

  const handleContainerChange = (idx: number, value: string) => {
    const updated = [...containers];
    updated[idx] = value;
    setContainers(updated);
  };

  const addContainer = () => {
    setContainers([...containers, ""]);
  };

  const removeContainer = (idx: number) => {
    setContainers(containers.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let requestDetails = "";
    if (requestType === "inbound") {
      requestDetails = `\n--- Inbound Request ---\nType: ${inboundType}\nNotes: ${inboundNotes}\nUrgency: ${inboundUrgency}\nDate Needed: ${inboundDate}\nContact: ${inboundContact}\nLocation: ${inboundLocation}`;
    } else if (requestType === "outbound") {
      requestDetails = `\n--- Outbound Request ---\nType: ${outboundType}\nNotes: ${outboundNotes}\nUrgency: ${outboundUrgency}\nDate Needed: ${outboundDate}\nDriver: ${outboundDriver}\nDestination: ${outboundDestination}`;
    }
    alert(
      `Weight: ${weight} ${unit}\nChild Name: ${childName}\nDate: ${date}\nCategory: ${ageGroup}\nItem Type: ${itemType}\nContainers: ${containers
        .filter(Boolean)
        .join(", ")}${requestDetails}`
    );
    // Add your submit logic here
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <main style={styles.main as React.CSSProperties}>
        <h1 style={styles.header as React.CSSProperties}>
          Create Weight Record
        </h1>
        <form
          onSubmit={handleSubmit}
          style={styles.form as React.CSSProperties}
        >
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
                  {Object.values(ContainerType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
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
                  ? "Remove Inbound Request"
                  : "Add Inbound Request"}
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
                  ? "Remove Outbound Request"
                  : "Add Outbound Request"}
              </button>
            </div>
            {requestType === "inbound" && (
              <div
                style={{
                  background: "#e0f2fe",
                  border: "2px solid #38bdf8",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  marginTop: "1rem",
                  marginBottom: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <h3 style={{ color: "#2563eb", margin: 0 }}>Inbound Request</h3>
                <label style={styles.label as React.CSSProperties}>
                  Location
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    style={styles.select as React.CSSProperties}
                    required
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </label>
                <label style={styles.label as React.CSSProperties}>
                  Supplier
                  <input
                    type="text"
                    value={inboundSupplier}
                    onChange={(e) => setInboundSupplier(e.target.value)}
                    placeholder="Enter Supplier Name"
                    style={styles.input as React.CSSProperties}
                    required
                  />
                </label>
                <label style={styles.label as React.CSSProperties}>
                  Contact Name
                  <input
                    type="text"
                    value={inboundContact}
                    onChange={(e) => setInboundContact(e.target.value)}
                    placeholder="Contact for inbound"
                    style={styles.input as React.CSSProperties}
                  />
                </label>
                <label style={styles.label as React.CSSProperties}>
                  Location
                  <input
                    type="text"
                    value={inboundLocation}
                    onChange={(e) => setInboundLocation(e.target.value)}
                    placeholder="Inbound location"
                    style={styles.input as React.CSSProperties}
                  />
                </label>
                <label style={styles.label as React.CSSProperties}>
                  Notes
                  <textarea
                    value={inboundNotes}
                    onChange={(e) => setInboundNotes(e.target.value)}
                    placeholder="Enter any notes"
                    style={
                      {
                        ...styles.input,
                        minHeight: "60px",
                        resize: "vertical",
                      } as React.CSSProperties
                    }
                  />
                </label>
                <label style={styles.label as React.CSSProperties}>
                  Urgency
                  <select
                    value={inboundUrgency}
                    onChange={(e) => setInboundUrgency(e.target.value)}
                    style={styles.select as React.CSSProperties}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </label>
                <label style={styles.label as React.CSSProperties}>
                  Date Needed
                  <input
                    type="date"
                    value={inboundDate}
                    onChange={(e) => setInboundDate(e.target.value)}
                    style={styles.input as React.CSSProperties}
                  />
                </label>
              </div>
            )}
            {requestType === "outbound" && (
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
                <h3 style={{ color: "#b45309", margin: 0 }}>
                  Outbound Request
                </h3>
                <label style={styles.label as React.CSSProperties}>
                  Request Type
                  <select
                    value={outboundType}
                    onChange={(e) => setOutboundType(e.target.value)}
                    style={styles.select as React.CSSProperties}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="delivery">Delivery</option>
                    <option value="collection">Collection</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </label>
                <label style={styles.label as React.CSSProperties}>
                  Driver Name
                  <input
                    type="text"
                    value={outboundDriver}
                    onChange={(e) => setOutboundDriver(e.target.value)}
                    placeholder="Driver for outbound"
                    style={styles.input as React.CSSProperties}
                  />
                </label>
                <label style={styles.label as React.CSSProperties}>
                  Destination
                  <input
                    type="text"
                    value={outboundDestination}
                    onChange={(e) => setOutboundDestination(e.target.value)}
                    placeholder="Outbound destination"
                    style={styles.input as React.CSSProperties}
                  />
                </label>
                <label style={styles.label as React.CSSProperties}>
                  Notes
                  <textarea
                    value={outboundNotes}
                    onChange={(e) => setOutboundNotes(e.target.value)}
                    placeholder="Enter any notes"
                    style={
                      {
                        ...styles.input,
                        minHeight: "60px",
                        resize: "vertical",
                      } as React.CSSProperties
                    }
                  />
                </label>
                <label style={styles.label as React.CSSProperties}>
                  Urgency
                  <select
                    value={outboundUrgency}
                    onChange={(e) => setOutboundUrgency(e.target.value)}
                    style={styles.select as React.CSSProperties}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </label>
                <label style={styles.label as React.CSSProperties}>
                  Date Needed
                  <input
                    type="date"
                    value={outboundDate}
                    onChange={(e) => setOutboundDate(e.target.value)}
                    style={styles.input as React.CSSProperties}
                  />
                </label>
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
  container: {
    minHeight: "100vh",
    background: "#f7fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    background: "#fff",
    padding: "2rem 2.5rem",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    minWidth: "320px",
  },
  header: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#2563eb",
    marginBottom: "1.5rem",
    textAlign: "center",
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
