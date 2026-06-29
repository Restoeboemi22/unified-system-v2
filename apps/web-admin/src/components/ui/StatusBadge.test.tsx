import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "@/components/ui/StatusBadge";

describe("StatusBadge", () => {
  it("menampilkan label status", () => {
    render(<StatusBadge value="active" />);

    expect(screen.getByText("active")).not.toBeNull();
  });

  it("menggunakan gaya terbatas untuk status limited", () => {
    render(<StatusBadge value="limited" />);

    expect(screen.getByText("limited").className).toContain("bg-amber-100");
  });
});
