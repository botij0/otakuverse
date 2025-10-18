import Hero from "@/components/custom/Hero";

export const HomePage = () => {
  return (
    <>
      <Hero onSearch={(query) => console.log("Searching for:", query)} />
    </>
  );
};
