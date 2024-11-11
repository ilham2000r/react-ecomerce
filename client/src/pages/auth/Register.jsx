import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "message must be 8 charactor" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password isn't match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [passwordScore, setPasswordScore] = useState(0);

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  console.log(passwordScore);

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  const onSubmit = async (data) => {
    // console.log(data);
    // if wanna fix password strong just active this code
    // const passwordScore = zxcvbn(data.password).score
    // if (passwordScore < 3 ) {
    //   toast.warning('Password is not strong')
    //   return
    // }
    try {
      const res = await axios.post("http://localhost:5001/api/register", data);
      console.log(res);
      navigate("/login");
      toast.success(res.data);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      console.log(err);
      toast.error(errMsg);
    }
  };

  return (
    <div className="mt-20 flex justify-center">
      <div className="w-full shadow-md rounded-md md:w-1/2 lg:w-1/2 p-10 bg-neutral-300 flex flex-col justify-center items-center ">
        <p className="text-3xl font-bold mb-5">Register</p>

        <form className="w-full lg:w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <p className="my-2 ">Email</p>
          <input
            {...register("email")}
            className={`border-2 w-full rounded-md focus:outline-none 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            ${errors.email && 'border-red-500 '}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <div className="flex flex-col">
            <p className="my-2">Password</p>
            <input
              {...register("password")}
              className={`border-2 w-full rounded-md focus:outline-none 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                ${errors.password && 'border-red-500'}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            {watch().password?.length > 0 && (
              <div className="flex w-full">
                {Array.from(Array(5).keys()).map((item, index) => (
                  <span className="w-1/5 px-1 " key={index}>
                    <div
                      className={`h-2 rounded-full my-2 ${
                        passwordScore <= 2
                          ? `bg-red-400 `
                          : passwordScore < 4
                          ? "bg-yellow-400"
                          : "bg-green-400"
                      }`}
                    ></div>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <p className="mb-2">Confirm Password</p>
            <input
              {...register("confirmPassword")}
              className={`border-2 w-full rounded-md focus:outline-none 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                ${errors.confirmPassword && 'border-red-500'}`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <Link to={"/login"} className="btn btn-neutral my-4 w-1/4">
              <button>Login</button>
            </Link>
            <button className="btn btn-neutral my-4 flex-grow">Register</button>
          </div>
          <p>Already have account ?</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
