export default function TopBar({ breadcrumb }: { breadcrumb: React.ReactNode }) {
  return (
    <div className="flex w-full bg-[#FFFF] gap-4 px-4 py-3 rounded-lg shadow-[0px_1px_2px_0px_#0F11140F]">
      {breadcrumb}
    </div>
  );
}
