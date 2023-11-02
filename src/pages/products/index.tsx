import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  message,
} from "antd";
import { useAppSelector } from "../../redux/hooks";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { controlLoading, getProducts } from "../../redux/slice/product";
import { AppDispatch } from "../../redux/store";
import ProductsCard from "../../components/card/ProductsCard";
import request from "../../server";
import { ProductsType } from "../../types/Products";

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading } = useAppSelector((state) => state.products);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callback, setCallback] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [search, setSerch] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnLoadingId, setBtnLoadingId] = useState<string | null>(null);
  console.log(selected);

  useEffect(() => {
    dispatch(getProducts({ search }));
  }, [dispatch, callback, search]);

  const refetch = () => {
    setCallback(!callback);
  };

  const showModal = () => {
    setIsModalOpen(true);
    setSelected(null);
    form.resetFields();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSerch(e.target.value);
    refetch();
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    try {
      setIsModalLoading(true);
      if (selected === null) {
        await request.post("products", values);
      } else {
        await request.put(`products/${selected}`, values);
      }
      refetch();
      closeModal();
      form.resetFields();
    } finally {
      setIsModalLoading(false);
    }
  };

  const editProducts = async (id: string) => {
    try {
      setSelected(id);
      dispatch(controlLoading());
      const { data } = await request.get<ProductsType>(`products/${id}`);
      setIsModalOpen(true);
      form.setFieldsValue(data);
    } finally {
      dispatch(controlLoading());
    }
  };

  const deleteProduct = async (id: string) => {
    setBtnLoadingId(id);
    try {
      setBtnLoading(true);
      await request.delete(`products/${id}`);
      refetch();
      message.success("Product deleted successfully");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Flex justify="space-between" align="center">
        <h1>Total ({products.length})</h1>
        <Input
          value={search}
          onChange={handleSearch}
          style={{ width: "auto", flexGrow: 1 }}
          placeholder="Searching..."
        />
        <Button onClick={showModal} type="dashed">
          Add Products
        </Button>
      </Flex>
      <Row gutter={24}>
        {products.map((product) => (
          <Col sm={24} md={8} lg={6} xs={24} key={product.id}>
            <ProductsCard
              key={product.id}
              {...product}
              editProducts={editProducts}
              deleteProduct={deleteProduct}
              btnLoading={btnLoading}
              btnLoadingId={btnLoadingId}
            />
          </Col>
        ))}
      </Row>

      <Modal
        title="Category data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add skill" : "Save skill"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          name="category"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  );
};

export default ProductsPage;
