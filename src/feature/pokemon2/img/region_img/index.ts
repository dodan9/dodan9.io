export const regionImages = import.meta.glob("./*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;
