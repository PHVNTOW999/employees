import Layout from "../../components/layout";
import {Card, Form, Row, Space, Typography} from "antd";
// @ts-ignore
import {User} from "@prisma/client";
import CustomInput from "../../components/UI/INPUT";
import {PasswordInput} from "../../components/UI/PASSWORD_INPUT";
import CustomBtn from "../../components/UI/BTN";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../../paths";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import React, {useState} from "react";
import {useRegisterMutation} from "../../app/services/auth";
import {isErrorWithMessage} from "../../utils/error";
import {Error} from "../../components/error";

type RegisterData = Omit<User, "id"> & {confirmPassword: string}

const Register = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [error, setError] = useState('');
    const [registerUser] = useRegisterMutation();
    const [loading, setLoading] = React.useState<boolean>(false);

    const register = async (data: RegisterData) => {
        try {
            setLoading(true)
            await registerUser(data).unwrap();
            navigate("/");
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
                    <Card title='Register' style={{width: '30rem'}}>
                        <Form onFinish={register}>
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
                            <Error message={error}/>
                        </Space>
                    </Card>
                </Row>
            </Layout>
        </div>
    );
};

export default Register;