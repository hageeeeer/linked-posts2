import { useForm } from "react-hook-form";
import Feedback from "../components/Feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/register.schema";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {Button} from "@heroui/react";

export default function Register() {
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  async function handleRegister(formData) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://route-posts.routemisr.com/users/signup`,
        formData,
      );

      toast.success("authenticated");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="max-w-lg mx-auto shadow shadow-gray-800 p-10 my-20 rounded-2xl"
    >
      <div className="relative z-0 w-full mb-5 group">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("name")}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          {errors.name && <Feedback msg={errors.name?.message} />}
          <label
            htmlFor="name"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            {" "}
            Name
          </label>
        </div>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=" "
          {...register("email")}
        />
        {errors.email && <Feedback msg={errors.email?.message} />}
        <label
          htmlFor="email"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Email{" "}
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          autoComplete="off"
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=" "
          {...register("password")}
        />
        {errors.password && <Feedback msg={errors.password?.message} />}
        <label
          htmlFor="password"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Password
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          autoComplete="off"
          id="rePassword"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=" "
          {...register("rePassword")}
        />
        {errors.rePassword && <Feedback msg={errors.rePassword?.message} />}
        <label
          htmlFor="rePassword"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Confirm password
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="date"
          id="dateOfBirth"
          className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=" "
          {...register("dateOfBirth")}
        />
        {errors.dateOfBirth && <Feedback msg={errors.dateOfBirth?.message} />}
        <label
          htmlFor="dateOfBirth"
          className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          dateOfBirth
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          {...register("gender")}
          id="female"
          type="radio"
          value={"female"}
          className="w-4 h-4 text-neutral-primary border-light-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none checked:border-blue-800 checked:bg-black"
        />
        <label
          htmlFor="female"
          className="select-none ms-2 text-sm font-medium text-fg-disabled"
        >
          Female
        </label>
      </div>
      <div className="flex items-center">
        <input
          {...register("gender")}
          id="male"
          type="radio"
          value={"male"}
          className="w-4 h-4 text-neutral-primary border-light bg-neutral-secondary-medium rounded-full checked:border-blue-800 checked:bg-black focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
        />
        <label
          htmlFor="male"
          className="select-none ms-2 text-sm font-medium text-fg-disabled"
        >
          Male
        </label>
      </div>
      {errors.gender && <Feedback msg={errors.gender?.message} />}
     
    {!isLoading? 
    <Button type="submit" className="my-4" color="primary" variant="faded">Register</Button>
  : <Button isLoading type="submit" className="my-4" color="primary" variant="shadow">Register</Button>}
     
    </form>
  );
}
