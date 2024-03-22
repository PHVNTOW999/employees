import Layout from "../../components/layout";
import {Card, Form, Row, Space, Typography} from "antd";
import CustomInput from "../../components/UI/INPUT";
import {PasswordInput} from "../../components/UI/PASSWORD_INPUT";
import CustomBtn from "../../components/UI/BTN";
import {Link} from "react-router-dom";
import {Paths} from "../../paths";

const Register = () => {
    return (
        <div>
            <Layout>
                <Row align='middle' justify='center'>
                    <Card title='Register' style={{width: '30rem'}}>
                        <Form onFinish={() => null}>
                            <CustomInput name="name" placeholder="Name"/>
                            <CustomInput name="email" placeholder="Email" type="email"/>
                            <PasswordInput name="password" placeholder="Password"/>
                            <PasswordInput name="confirmPassword" placeholder="Confirm Password"/>
                            <CustomBtn type="primary" htmlType="submit">Registration</CustomBtn>
                        </Form>
                        <Space direction="vertical" size="large">
                            <Typography.Text>
                                have an account? <Link to={Paths.login}>Login</Link>
                            </Typography.Text>
                        </Space>
                    </Card>
                </Row>
            </Layout>
        </div>
    );
};

export default Register;