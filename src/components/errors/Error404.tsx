import { NavLink } from "react-router";

export default function Error404() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col">
        <div className="font-[500] text-[20px] leading-[100%] text-primary">404</div>
        <div className="flex flex-col gap-1 max-w-[570px] mt-2 mb-5">
          <p className="font-[600] text-[36px] text-[#1F1F1F]">Page Not Found</p>
          <p className="font-[400] text-[16px] text-[#595959]">
            The page you are looking for could not be found. Please check the URL or return to the homepage.
          </p>
        </div>
        <NavLink to="/admin" className="flex items-center gap-2 text-[16px] text-primary underline" replace>
          Back to home
        </NavLink>
      </div>
    </div>
  );
}
