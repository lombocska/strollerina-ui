export default function CarSeatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full mt-100">
       {children}
    </div>
  );
}
