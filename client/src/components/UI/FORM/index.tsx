// @ts-ignore
import {Employee} from "@prisma/client";
import {Card, Form, Space} from "antd";
import CustomInput from "../INPUT";
import React from "react";
import {Error} from "../../error";
import CustomBtn from "../BTN";

type Props<T> = {
    onFinish: (value: T) => void;
    btnText: string;
    title: string;
    error?: string;
    employee?: T;
}

export const CustomForm = ({ onFinish, title, btnText, error, employee}: Props<Employee>) => {
    return (
        <Card title={title} style={{width: "30rem"}}>
            <Form name='employee__form' onFinish={onFinish} initialValues={employee}>
                <CustomInput type='text' name='firstName' placeholder="First Name" />
                <CustomInput type='text' name='lastName' placeholder="Last Name" />
                <CustomInput type='number' name='age' placeholder="Age" />
                <CustomInput type='text' name='address' placeholder="Address" />
                <Space>
                    <Error message={error} />
                    <CustomBtn htmlType='submit'>{btnText}</CustomBtn>
                </Space>
            </Form>
        </Card>
    );
};
