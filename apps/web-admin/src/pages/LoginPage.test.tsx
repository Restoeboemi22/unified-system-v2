import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import LoginPage from "@/pages/LoginPage";

function renderPage() {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("LoginPage", () => {
  it("menampilkan token admin demo", () => {
    renderPage();

    expect(screen.getByText("ADMIN_TOKEN")).not.toBeNull();
    expect(screen.getByText("Masuk ke web-admin")).not.toBeNull();
  });

  it("menampilkan tombol submit login", () => {
    renderPage();

    expect(screen.getAllByRole("button", { name: /Masuk dan bangun session/i }).length).toBeGreaterThan(0);
  });
});
