import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import {
  getAllCompanions,
  getRecentSessions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  // Получаем userId из Clerk (серверный)
  const { userId } = await auth();

  // Получаем данные для показа
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  // Получаем companions, которые пользователь добавил в закладки
  let bookmarkedIds = new Set<string>();
  if (userId) {
    const bookmarkedCompanions = await getBookmarkedCompanions(userId);
    bookmarkedIds = new Set(bookmarkedCompanions.map((c) => c.id));
  }

  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
            bookmarked={bookmarkedIds.has(companion.id)} // Передаём bookmarked!
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
