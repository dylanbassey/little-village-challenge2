"use client";
import React, { useEffect, useState } from "react";
import {
  getInboundRequests,
  getOutboundRequests,
  getWeightRecords,
  deleteInboundRequest,
  deleteOutboundRequest,
  deleteWeightRecord,
} from "@/services/boundService";

import { InboundRequest } from "@/interfaces/inboundRequest";
import { OutboundRequest } from "@/interfaces/outboundRequest";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

type WeightRecord = {
  id: number;
  childName: string;
  date: string;
  category: string;
  containers: string[];
};

const TABS = ["Inbound", "Outbound", "Weight"];

export default function RecordsPage() {
  const router = useRouter();
  const [tab, setTab] = useState("Inbound");
  const [inbounds, setInbounds] = useState<InboundRequest[]>([]);
  const [outbounds, setOutbounds] = useState<OutboundRequest[]>([]);
  const [weights, setWeights] = useState<WeightRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getInboundRequests(),
      getOutboundRequests(),
      getWeightRecords ? getWeightRecords() : Promise.resolve([]),
    ])
      .then(([inb, outb, wts]) => {
        setInbounds(inb);
        setOutbounds(outb);
        setWeights(wts);
      })
      .finally(() => setLoading(false));
  }, []);

  /* =========================
     DELETE HANDLERS
  ========================= */

  const handleDeleteInbound = async (id: number) => {
    if (!confirm("Delete this inbound record?")) return;
    await deleteInboundRequest(id);
    setInbounds((prev) => prev.filter((i) => i.id !== id));
  };

  const handleDeleteOutbound = async (id: number) => {
    if (!confirm("Delete this outbound record?")) return;
    await deleteOutboundRequest(id);
    setOutbounds((prev) => prev.filter((o) => o.id !== id));
  };

  const handleDeleteWeight = async (id: number) => {
    if (!confirm("Delete this weight record?")) return;
    await deleteWeightRecord(id);
    setWeights((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div
      style={{ minHeight: "100vh", background: "#f7faf5", padding: "2rem 0" }}
    >
      <main
        style={{
          background: "#fff",
          maxWidth: 800,
          margin: "0 auto",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: "2rem 2.5rem",
        }}
      >
        <button
          type="button"
          onClick={() => router.back()}
          style={
            {
              background: "transparent",
              border: "none",
              color: "#6b7280",
              cursor: "pointer",
              fontSize: "0.95rem",
              padding: 0,
              marginBottom: "1rem",
            } as React.CSSProperties
          }
        >
          ← Back
        </button>
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            fontWeight: 600,
            fontSize: "2rem",
            marginBottom: "2rem",
          }}
        >
          Records
        </h1>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 32,
            justifyContent: "center",
          }}
        >
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: tab === t ? "#2563eb" : "#f1f5f9",
                color: tab === t ? "#fff" : "#2563eb",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                padding: "0.5rem 1.5rem",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", color: "#888" }}>Loading...</div>
        ) : (
          <div>
            {/* ================= INBOUND ================= */}
            {tab === "Inbound" && (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {inbounds.map((inb) => (
                  <li
                    key={inb.id}
                    style={{
                      background: "#e0f2fe",
                      border: "1px solid #38bdf8",
                      borderRadius: 10,
                      marginBottom: 16,
                      padding: "1rem 1.5rem",
                      position: "relative",
                    }}
                  >
                    <div style={{ fontWeight: 600, color: "#2563eb" }}>
                      {inb.location} &mdash; {inb.category}
                    </div>
                    <div style={{ color: "#374151", fontSize: "0.97em" }}>
                      Supplier: {inb.supplierOrganisation} | Contact:{" "}
                      {inb.contact}
                    </div>
                    <div style={{ color: "#374151", fontSize: "0.97em" }}>
                      Delivery:{" "}
                      {inb.expDeliveryDate
                        ? new Date(inb.expDeliveryDate).toLocaleDateString()
                        : "-"}
                    </div>
                    <div style={{ color: "#374151", fontSize: "0.97em" }}>
                      Notes: {inb.notes}
                    </div>
                    <div style={{ color: "#374151", fontSize: "0.97em" }}>
                      Usage Plan: {inb.usagePlan}
                    </div>
                    <div style={{ color: "#374151", fontSize: "0.97em" }}>
                      Description: {inb.description}
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteInbound(inb.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
                {inbounds.length === 0 && (
                  <li style={{ color: "#888", textAlign: "center" }}>
                    No inbound records found.
                  </li>
                )}
              </ul>
            )}

            {/* ================= OUTBOUND ================= */}
            {tab === "Outbound" && (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {outbounds.map((outb) => (
                  <li
                    key={outb.id}
                    style={{
                      background: "#fef9c3",
                      border: "1px solid #fde047",
                      borderRadius: 10,
                      marginBottom: 16,
                      padding: "1rem 1.5rem",
                    }}
                  >
                    <div style={{ fontWeight: 600, color: "#b45309" }}>
                      {outb.location} &mdash; {outb.category}
                    </div>
                    <div style={{ color: "#374151", fontSize: "0.97em" }}>
                      Organisation: {outb.organisation} | Contact:{" "}
                      {outb.contact}
                    </div>
                    <div style={{ color: "#374151", fontSize: "0.97em" }}>
                      Completed: {outb.completed === "Y" ? "Yes" : "No"}
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteOutbound(outb.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
                {outbounds.length === 0 && (
                  <li style={{ color: "#888", textAlign: "center" }}>
                    No outbound records found.
                  </li>
                )}
              </ul>
            )}

            {/* ================= WEIGHT ================= */}
            {tab === "Weight" && (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {weights.map((w) => (
                  <li
                    key={w.id}
                    style={{
                      background: "#f3f4f6",
                      border: "1px solid #d1d5db",
                      borderRadius: 10,
                      marginBottom: 16,
                      padding: "1rem 1.5rem",
                    }}
                  >
                    <div style={{ fontWeight: 600, color: "#2563eb" }}>
                      {w.childName} ({w.category})
                    </div>
                    <div style={{ color: "#374151", fontSize: "0.97em" }}>
                      Date:{" "}
                      {w.date ? new Date(w.date).toLocaleDateString() : "-"}
                    </div>
                    <div style={{ color: "#374151", fontSize: "0.97em" }}>
                      Containers: {w.containers?.join(", ")}
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteWeight(w.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
                {weights.length === 0 && (
                  <li style={{ color: "#888", textAlign: "center" }}>
                    No weight records found.
                  </li>
                )}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
