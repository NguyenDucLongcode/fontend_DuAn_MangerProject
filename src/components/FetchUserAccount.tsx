"use client";
import { useEffect } from "react";
import { actions } from "@/redux/slices";
import { useAppDispatch } from "@/redux/customHook"; // Dùng hook custom

const FetchUserAccount = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUser = async () => {
      dispatch(actions.auth.fetchUser());
    };

    checkUser();
  }, [dispatch]);
  return null;
};

export default FetchUserAccount;
