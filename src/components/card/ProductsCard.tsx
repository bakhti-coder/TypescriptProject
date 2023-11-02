import { Button, Card, Flex, Image } from "antd";
import { ProductsType } from "../../types/Products";
import Meta from "antd/es/card/Meta";

interface ProductsProps extends ProductsType {
  editProducts: (id: string) => void;
  deleteProduct: (id: string) => void;
  btnLoadingId: string | null;
  btnLoading: boolean;
}

const ProductsCard = ({
  title,
  image,
  description,
  price,
  id,
  editProducts,
  deleteProduct,
  btnLoadingId,
  btnLoading,
}: // editProduct,
ProductsProps) => {
  return (
    <Card
      style={{ margin: "30px 0" }}
      cover={<Image alt="example" src={image} />}
      actions={[
        <Flex justify="space-around" align="center">
          <Button type="primary" onClick={() => editProducts(id)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => deleteProduct(id)}
            loading={btnLoadingId === id && btnLoading ? true : false}
          >
            Delete
          </Button>
        </Flex>,
        // <EditOutlined key={id} onClick={() => editProducts(id)} />,
        // <DeleteOutlined key="delete" onClick={() => deleteProduct(id)} />,
      ]}
    >
      <Meta title={title} description={description} />
      <p style={{ marginTop: "20px", fontWeight: "600" }}>{price}$</p>
    </Card>
  );
};

export default ProductsCard;
