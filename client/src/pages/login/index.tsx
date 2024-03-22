import React from 'react';
import Layout from "../../components/layout";
import {Card, Form, Row, Space, Typography} from "antd";
import CustomInput from "../../components/UI/INPUT";
import {PasswordInput} from "../../components/UI/PASSWORD_INPUT";
import CustomBtn from "../../components/UI/BTN";
import {Link} from "react-router-dom";
import {Paths} from "../../paths";

const Login = () => {
    return (
        <div>
            <Layout>
                <Row align='middle' justify='center'>
                    <Card title='Login' style={{width: '30rem'}}>
                        <Form onFinish={() => null}>
                            <CustomInput name="email" placeholder="Email" type="email"/>
                            <PasswordInput name="password" placeholder="Password"/>
                            <CustomBtn type="primary" htmlType="submit">Login</CustomBtn>
                        </Form>
                        <Space direction="vertical" size="large">
                            <Typography.Text>
                                Don't have an account? <Link to={Paths.register}>Register</Link>
                            </Typography.Text>
                        </Space>
                    </Card>
                </Row>
            </Layout>
        </div>
    );
};

export default Login;
