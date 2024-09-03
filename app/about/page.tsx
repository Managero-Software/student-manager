import Sidebar from "@/components/Sidebar";
import HeaderMenu from "@/components/HeaderMenu";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const About = async () => {
  const user = await getLoggedInUser();
  if (!user) redirect("/login");
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen w-full">
      <Sidebar />
      <div className="grid grid-rows-[60px_1fr]">
        <header className="flex h-14 items-center gap-4 border-b md:border-b-0 bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <HeaderMenu />
        </header>
        <main className="grid grid-rows-[10px_1fr] gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="grid content-center">
            <h1 className="header font-semibold md:text-2xl">About Us</h1>
          </div>
          <div className="grid gap-4 lg:gap-6">
            <section className="rounded-lg border border-dashed shadow-sm p-4">
              <h2 className="text-xl font-bold">Our Mission</h2>
              <p className="mt-2 text-base text-muted-foreground">
                Our mission is to provide high-quality education and ensure the
                success of every student through personalized learning
                experiences.
              </p>
            </section>
            <section className="rounded-lg border border-dashed shadow-sm p-4">
              <h2 className="text-xl font-bold">Our Vision</h2>
              <p className="mt-2 text-base text-muted-foreground">
                We envision a world where education is accessible to all,
                fostering innovation and growth in every learner.
              </p>
            </section>
            <section className="rounded-lg border border-dashed shadow-sm p-4">
              <h2 className="text-xl font-bold">Contact Us</h2>
              <p className="mt-2 text-base text-muted-foreground">
                If you have any questions or need further information, feel free
                to contact us:
              </p>
              <ul className="mt-2">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:managero.software@gmail.com"
                    className="text-primary"
                  >
                    managero.software@gmail.com
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a href="tel:+40758272292" className="text-primary">
                    +40 758 272 292
                  </a>
                </li>
                <li>Address: Romania, Cluj County, Cluj-Napoca</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default About;
