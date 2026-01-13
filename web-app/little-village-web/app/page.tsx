"use client";
import Button from "@/components/button";
import { getContainerTypes } from "@/services/containerService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const fetchContainerTypes = async () => {
    try {
      const response = await getContainerTypes();
      console.log("Container Types:", response);
    } catch (error) {
      console.log("Error fetching container types:", error.request);
    }
  };

  useEffect(() => {
    fetchContainerTypes();
  }, []);

  return (
    <div style={styles.container as React.CSSProperties}>
      <main style={styles.card as React.CSSProperties}>
        <h1 style={styles.header as React.CSSProperties}>Little Village</h1>

        <p style={styles.subtitle as React.CSSProperties}>
          Baby things, big impact
        </p>

        <p style={styles.intro as React.CSSProperties}>
          Helping families by collecting, sorting, and redistributing essential
          baby items with care and compassion.
        </p>

        <div style={styles.buttonContainer as React.CSSProperties}>
          <Button onClick={() => router.push("/createWeight")}>
            Record Weight
          </Button>

          <Button onClick={() => router.push("/createInbound")}>
            New Inbound Request
          </Button>

          <Button onClick={() => router.push("/createOutbound")}>
            New Outbound Request
          </Button>

          <Button onClick={() => router.push("/records")}>Show Records</Button>
        </div>
      </main>
    </div>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  container: {
    minHeight: "100vh",
    padding: "2rem 1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "#f7faf5", // soft, warm background
  },

  card: {
    maxWidth: "420px",
    width: "100%",
    background: "#ffffff",
    padding: "2.5rem 2rem",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  header: {
    fontSize: "42px",
    fontWeight: 600,
    color: "#2f3e2f", // soft forest tone
    marginBottom: "0.5rem",
  },

  subtitle: {
    fontSize: "18px",
    fontWeight: 500,
    color: "#6b7b6b",
    marginBottom: "1.5rem",
  },

  intro: {
    fontSize: "15px",
    lineHeight: 1.6,
    color: "#4b5563",
    marginBottom: "2.5rem",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
};
