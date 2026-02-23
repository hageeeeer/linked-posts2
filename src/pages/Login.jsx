import React, { useContext, useState } from "react";
import Feedback from "../components/Feedback";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/login.sheme";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@heroui/button";
import { authContext } from "../context/AuthContext";

export default function Login() {

  const [isLoading,setLoading] = useState(false)

  const {setLogin} = useContext(authContext)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver:zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleLogin(formData) {
    setLoading(true)
    axios.post(`https://route-posts.routemisr.com/users/signin`,formData)
    .then(data=>{
      toast.success('successfully login')
      setLogin(data?.data?.data?.token)
      localStorage.setItem('token',data?.data?.data?.token)
      setTimeout(()=>{
        navigate('/home')
      },2000)
      
    })
    .catch(data=>toast.error(data?.message))
    .finally(()=>{setLoading(false)})
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="max-w-lg mx-auto shadow shadow-gray-800 p-10 my-20 rounded-2xl"
    >
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

      {!isLoading? 
    <Button type="submit" className="my-4" color="primary" variant="faded">Login</Button>
  : <Button isLoading type="submit" className="my-4" color="primary" variant="shadow">Login</Button>}

      <p className="my-5">Dont have link <Link className="font-bold text-blue-600" to={'/register'}>Register first</Link> </p>
    </form>
  );
}
