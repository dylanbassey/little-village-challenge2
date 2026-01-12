"use client";
import React, { useState } from "react";
import Button from "@/components/button";

export default function CreateWeight() {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [childName, setChildName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [ageGroup, setAgeGroup] = useState("0-6");
  const [itemType, setItemType] = useState("clothes");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Weight: ${weight} ${unit}\nChild Name: ${childName}\nParent Email: ${parentEmail}\nAge Group: ${ageGroup}\nItem Type: ${itemType}`
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
            Child's Name
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Enter child's name"
              style={styles.input as React.CSSProperties}
              required
            />
          </label>
          <label style={styles.label as React.CSSProperties}>
            Parent Email
            <input
              type="email"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              placeholder="Enter parent email"
              style={styles.input as React.CSSProperties}
              required
            />
          </label>
          <label style={styles.label as React.CSSProperties}>
            Age Group
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              style={styles.select as React.CSSProperties}
            >
              <option value="0-6">0-6 months</option>
              <option value="6-12">6-12 months</option>
              <option value="1-2">1-2 years</option>
              <option value="2-4">2-4 years</option>
              <option value="4+">4+ years</option>
            </select>
          </label>
          <label style={styles.label as React.CSSProperties}>
            Item Type
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              style={styles.select as React.CSSProperties}
            >
              <option value="clothes">Clothes</option>
              <option value="toys">Toys</option>
              <option value="books">Books</option>
              <option value="equipment">Equipment</option>
            </select>
          </label>
          <label style={styles.label as React.CSSProperties}>
            Weight
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
              style={styles.input as React.CSSProperties}
              required
            />
          </label>
          <label style={styles.label as React.CSSProperties}>
            Unit
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              style={styles.select as React.CSSProperties}
            >
              <option value="kg">Kilograms (kg)</option>
              <option value="lb">Pounds (lb)</option>
            </select>
          </label>
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
