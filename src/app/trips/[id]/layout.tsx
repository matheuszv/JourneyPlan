
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import Trips from "./page";

export const metadata: Metadata = {
  title: "Journey - PLAN",
  description: "WEBSITE TO CREATE TRAVEL PLANS",
};

export default async function RootLayout({
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string }
}>) {


  const travelPlans = await prisma.travel.findUnique({
    where: { id: params.id },
  })

  const activities = await prisma.activities.findMany({
    where: { travelId: params.id },
    orderBy: {
      date: 'asc', // ou 'desc' pra ordem decrescente
    },
  })

  return (
    <div className="dark">
      <Trips travelPlans={travelPlans} plans={JSON.parse(JSON.stringify(activities))} />
    </div>
  );
}
