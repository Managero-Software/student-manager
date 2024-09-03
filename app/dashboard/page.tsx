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
        <header className="flex h-14 items-center gap-4 border-b md:border-b-0 bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <HeaderMenu />
        </header>
        <main className="grid grid-rows-[10px_1fr] gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="grid content-center">
            <h1 className="header font-semibold md:text-2xl">Dashboard</h1>
          </div>
          <div className="grid grid-flow-row lg:grid-cols-2 lg:grid-rows-2 gap-1">
            {classesData ? (
              <div className="col-span-2 row-span-2 gap-1 grid grid-rows-[50px_1fr] h-full rounded-lg border border-dashed shadow-sm">
                <div className="grid justify-items-end m-2">
                  <ClassDialog />
                </div>
                <div className="overflow-auto grid auto-rows-min gap-1 m-2">
                  <ClassSchedule data={classesData} />
                </div>
              </div>
            ) : (
              <div className="col-span-2 row-span-2 flex h-full  flex-grow items-center justify-center rounded-lg border border-dashed shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    The schedule is empty for today.
                  </h3>
                  <ClassDialog />
                </div>
              </div>
            )}

            {/* <div className="col-span-2 lg:col-span-1 flex flex-grow flex-col gap-1 text-center items-center justify-center rounded-lg border border-dashed shadow-sm">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no exams scheduled.
              </h3>

              <ExamDialog />
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-grow flex-col gap-1 text-center items-center justify-center rounded-lg border border-dashed shadow-sm">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no missed classes.
              </h3>
              <p className="text-sm text-muted-foreground">
                Your missed classes and exams will be shown here.
              </p>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
