import React, {useState} from 'react';
import Layout from "../../components/layout";
import {Card, Form, Row, Space, Spin, Typography} from "antd";
import CustomInput from "../../components/UI/INPUT";
import {PasswordInput} from "../../components/UI/PASSWORD_INPUT";
import CustomBtn from "../../components/UI/BTN";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../../paths";
import {useLoginMutation, UserData} from "../../app/services/auth";
import {isErrorWithMessage} from "../../utils/error";
import {Error} from "../../components/error";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [loginUser, loginResult] = useLoginMutation();
    const [error, setError] = useState('');
    const login = async (data: UserData) => {
        try {
            setLoading(true)
            await loginUser(data).unwrap();
            navigate("/")
        } catch (error) {
            const maybeError = isErrorWithMessage(error);

            if (maybeError) {
                setError(error.data.message);
            } else {
                setError("Unknown error");
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Layout>
                <Row align='middle' justify='center'>
                    <Card title='Login' style={{width: '30rem'}}>
                        <Spin spinning={loading}>
                            <Form onFinish={login}>
                                <CustomInput name="email" placeholder="Email" type="email"/>
                                <PasswordInput name="password" placeholder="Password"/>
                                <CustomBtn type="primary" htmlType="submit">Login</CustomBtn>
                            </Form>
                            <Space direction="vertical" size="large">
                                <Typography.Text>
                                    Don't have an account? <Link to={Paths.register}>Register</Link>
                                </Typography.Text>
                                <Error message={error}/>
                            </Space>
                        </Spin>
                    </Card>
                </Row>
            </Layout>
        </div>
    );
};

export default Login;
