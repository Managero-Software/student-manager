import { getLoggedInUser } from "@/lib/actions/user.actions";
import Sidebar from "@/components/Sidebar";

import { redirect } from "next/navigation";
import HeaderMenu from "@/components/HeaderMenu";
import ClassDialog from "@/components/dialogs/ClassDialog";
import ExamDialog from "@/components/dialogs/ExamDialog";
import { getAllClasses } from "@/lib/actions/class.actions";
import ClassSchedule from "@/components/ClassSchedule";

const Dashboard = async () => {
  const user = await getLoggedInUser();
  if (!user) redirect("/login");
  const classesData = await getAllClasses(user.$id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen w-full ">
      <Sidebar />
      <div className="grid grid-rows-[60px_1fr]">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <HeaderMenu />
        </header>
        <main className="grid grid-rows-[10px_1fr] gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="grid content-center">
            <h1 className="header font-semibold md:text-2xl">Profile</h1>
          </div>
          <div className="grid grid-flow-row lg:grid-cols-2 lg:grid-rows-2 gap-1">
            Profile content
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
