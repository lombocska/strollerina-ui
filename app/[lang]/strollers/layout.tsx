export default function StrollersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <div className="flex h-full w-full mt-100">
       {children}
    </div>
  );
}
