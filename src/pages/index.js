import Featured from "@/components/Featured";
import Header from "@/components/Header";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({featuredProduct}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct}/>
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProdID = '648ca85048dac8a0f94dc539';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProdID);

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
    },
  };
}