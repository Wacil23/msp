import React from "react";
import "@mantine/core/styles.css";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="bg-main">{children}</main>;
}
