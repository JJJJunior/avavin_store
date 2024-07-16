import Collections from "@/components/Collections";
import Productlist from "@/components/Productlist";
import Image from "next/image";
const Home = () => {
  return (
    <>
      <Image src="/banner.png" alt="banner" width={2000} height={1000} />
      <Collections />
      <Productlist />
    </>
  );
};
export default Home;
