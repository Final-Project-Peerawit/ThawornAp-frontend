import { Button, Form, Input, PageHeader, Select, Skeleton, message } from "antd";
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query";
import { getTypeBranch } from "src/dataService/api_branch/get";
import { IUserProfileResult, getUserProfile } from "src/dataService/api_user_profile/get";
import Modal from './components/confirm_modal'
import { IUpdateUserProfileData, updateUserProfile } from "src/dataService/api_user_profile/put";

export default function profile(): React.ReactElement {
    const [newPassword, setNewPassword] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [form] = Form.useForm<IUserProfileResult>()

    const { data: dataBranch, isLoading: isLoadingBranch } = useQuery({
        queryKey: ["register"],
        queryFn: async () => getTypeBranch(),
    });

    const { data: getPofileDate, isLoading: isLoadingGetPofileDate, refetch } = useQuery({
        queryKey: ["getUserProfile"],
        queryFn: async () => getUserProfile(),
    });

    const { mutate } = useMutation({
        mutationKey: ["updateUserProfile"],
        mutationFn: async (data: IUpdateUserProfileData) => {
            return updateUserProfile({ data: data });
        },
        onSuccess: () => {
            message.success("อัพเดตสำเร็จ");
            setNewPassword(false)
            form.resetFields(['password', 'confirmPassword'])
        },
        onError: () => {
            message.error("อัพเดตไม่สำเร็จ");
        },
    });

    const onFinish = (): void => {
        setOpen(true)
    }

    const onHandleOk = () => {
        const normal = {
            password: form.getFieldValue('password')
        }

        mutate(normal)
    }

    useEffect(() => {
        form.setFieldsValue({
            branch_id: getPofileDate?.result[0].branch_id,
            email: getPofileDate?.result[0].email,
            firstname: getPofileDate?.result[0].firstname,
            lastname: getPofileDate?.result[0].lastname,
            phone_number: getPofileDate?.result[0].phone_number,
            room_number: getPofileDate?.result[0].room_number,
        })
    }, [getPofileDate?.result])


    return (
        <div className="pb-10">
            <Modal isOpen={open} onHandleOk={() => onHandleOk()} onValueChange={() => setOpen(false)} key={'44'} />
            <PageHeader onBack={() => window.history.back()} title="ข้อมูลผู้ใช้งาน" />
            {
                isLoadingGetPofileDate ? <Skeleton active /> : <div className="flex flex-initial justify-center">
                    <div className="w-full max-w-[800px]">
                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="ชื่อ"
                                name="firstname"

                            >
                                <Input allowClear disabled />
                            </Form.Item>
                            <Form.Item
                                label="นามสกุล"
                                name="lastname"

                            >
                                <Input allowClear disabled />
                            </Form.Item>
                            <Form.Item name={"branch_id"} label="สาขา">
                                <Select
                                    className="w-full"
                                    placeholder="เลือกสาขา"
                                    allowClear
                                    loading={isLoadingBranch}
                                    disabled={isLoadingBranch || true}
                                    options={dataBranch?.result.map((item) => ({
                                        label: item.branch_name,
                                        value: item.branch_id,
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item
                                label="เลขห้อง"
                                name="room_number"

                            >
                                <Input allowClear disabled />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="อีเมล์"

                            >
                                <Input allowClear disabled />
                            </Form.Item>
                            <Form.Item
                                name="phone_number"
                                label="เบอร์โทรศัพท์"

                            >
                                <Input allowClear disabled />
                            </Form.Item>
                            {
                                !newPassword ?
                                    (<div className="mb-3">
                                        <Button type="primary" onClick={() => setNewPassword(true)}>เปลี่ยนรหัสผ่าน</Button>
                                    </div>) :
                                    (<div className="mb-3">
                                        <Button danger onClick={() => setNewPassword(false)}>ยกเลิกเปลี่ยนรหัสผ่าน</Button>
                                    </div>)
                            }

                            {
                                newPassword && (
                                    <>
                                        <Form.Item
                                            name="password"
                                            label="รหัสผ่านใหม่"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณากรอกรหัสผ่าน",
                                                },
                                            ]}
                                        >
                                            <Input.Password allowClear />
                                        </Form.Item>
                                        <Form.Item
                                            name="confirmPassword"
                                            label="ยืนยันรหัสผ่านใหม่"
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณากรอกยืนยันรหัสผ่าน",
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_rule, value) {
                                                        if (!value || getFieldValue("password") === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error("รหัสผ่านไม่ตรงกัน"));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password allowClear />
                                        </Form.Item></>
                                )
                            }
                            {
                                newPassword && (
                                    <div className="text-center">
                                        <Button type="primary" htmlType="submit" >
                                            ยืนยัน
                                        </Button>
                                    </div>
                                )
                            }
                        </Form>
                    </div>
                </div>
            }

        </div>
    )

}