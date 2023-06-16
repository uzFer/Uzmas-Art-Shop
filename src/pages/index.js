import Featured from "@/components/Featured";
import Header from "@/components/Header";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({product}) {
  return (
    <div>
      <Header />
      <Featured />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProdID = '648ca85048dac8a0f94dc539';
  await mongooseConnect();
  const product = await Product.findById(featuredProdID);

  return {
    props: {product},

  };
}