import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <main className="bg-slate-200 flex">
            <Sidebar />
            <div className="flex flex-col flex-grow p-10 h-screen">
                {children}
            </div>
        </main>
    )
}