"use client";
import Button from "@/components/button";
import { getContainerTypes } from "@/services/containerService";
import Image from "next/image";
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
      <main>
        <h1 style={styles.header as React.CSSProperties}>Little Village</h1>
        <h4 style={styles.subtitle as React.CSSProperties}>
          Baby things, big impact
        </h4>
        <div style={styles.buttonContainer as React.CSSProperties}>
          <Button onClick={() => router.push("/createWeight")}>
            Create Weight Record
          </Button>
          <Button onClick={() => alert("Learn More clicked!")}>
            Create Inbound Request
          </Button>
          <Button onClick={() => alert("Donate clicked!")}>
            Create Outbound Request
          </Button>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "2rem 0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: "48px",
    fontWeight: "600",
    color: "#000000",
  },
  subtitle: {
    fontSize: "24px",
    marginTop: "1rem",
    textAlign: "center",
    color: "#000000",
  },
  buttonContainer: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
};
