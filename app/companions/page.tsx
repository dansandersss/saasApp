import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import {
  getAllCompanions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ?? "";
  const topic = filters.topic ?? "";

  // Получаем userId через Clerk (серверный)
  const { userId } = await auth();

  // Получаем всех companions по фильтрам
  const companions = await getAllCompanions({ subject, topic });

  // Если пользователь авторизован, получаем его bookmarked companions
  let bookmarkedIds = new Set<string>();
  if (userId) {
    const bookmarkedCompanions = await getBookmarkedCompanions(userId);
    bookmarkedIds = new Set(bookmarkedCompanions.map((c) => c.id));
  }

  return (
    <>
      <main className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>

        <section className="companions-grid">
          {companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
              bookmarked={bookmarkedIds.has(companion.id)}
            />
          ))}
        </section>
      </main>
    </>
  );
};

export default CompanionsLibrary;
