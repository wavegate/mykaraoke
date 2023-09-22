import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import AnimatedPage from "@/components/AnimatedPage/AnimatedPage";
import { API_URL } from "@/constants";
const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
});
export default function LoginPage() {
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    function onSubmit(values) {
        axios
            .post(`${API_URL}/login`, values)
            .then((res) => {
            localStorage.setItem("token", res?.data);
            toast({
                title: "Login successful!",
            });
        })
            .catch((error) => {
            toast({
                variant: "destructive",
                title: "Login failed!",
                description: error.response?.data.message,
            });
        });
    }
    return (_jsxs(AnimatedPage, { children: [_jsx("div", { children: "Login" }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(FormField, { control: form.control, name: "username", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Username" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "username", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "password", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", children: "Submit" })] }) })] }));
}
