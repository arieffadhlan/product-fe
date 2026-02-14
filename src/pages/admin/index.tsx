import { HomeIcon } from "lucide-react";
import { BreadcrumbMenus } from "@/components/breadcrumb-menus";
import Container from "@/components/container";
import TopBar from "@/components/containers/top-bar";
import { useAuthStore } from "@/store/auth-store";

export default function Home() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col gap-2">
      <TopBar breadcrumb={<BreadcrumbMenus icon={HomeIcon} data={[{ name: "Home" }]} />} />
      <Container>
        <div className="flex flex-col gap-6">
          <p className="font-semibold text-3xl text-gray-900">
            Welcome user : {user?.firstName} {user?.lastName}
          </p>
        </div>
      </Container>
    </div>
  );
}
