import Button from "@/components/Button";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({featuredProduct, newProducts, allProducts}) {
  return (
    <div>
      <Header products={allProducts}/>
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts}/>
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProdID = '648ca85048dac8a0f94dc539';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProdID);
  const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 3});
  const allProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 6});

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    },
  };
}