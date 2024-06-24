export default function StrollersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="flex h-screen w-full">
    // <div className="box-border flex h-full flex-col justify-between ">
    // <div className="box-border flex flex-col h-screen justify-between">
      
    <div className="flex h-screen w-full mt-100">

       {children}
    </div>
  );
}
