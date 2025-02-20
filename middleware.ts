// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

// export function middleware(request: NextRequest) {
//   const isAuthenticated = useSelector((state: RootState) => {
//     return state.authData.isAuthenticated;
//   });

//   if (!isAuthenticated) {
//     // redirect when not authenticated
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next(); // continue when authenticated
// }
