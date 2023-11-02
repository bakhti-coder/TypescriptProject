import { useState } from "react";
import { Button, Form, Input, Flex, message } from "antd";
import { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { TOKEN } from "../../constants";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type FieldType = {
  email?: string;
  password?: string;
};
const LoginPage = () => {
  const navigate = useNavigate();

  const { setIsLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FieldType) => {
    try {
      setLoading(true);
      const { data } = await axios.post<{ token: string }>(
        "https://reqres.in/api/login",
        values
      );
      Cookies.set(TOKEN, data.token);
      setIsLogin(true);
      navigate("/dashboard");
      message.success("Successfully login😊");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} style={{ width: "100%" }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginPage;
