"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "./Pagination";
import { Publisher, getBooksByPublisherId } from "@/lib/data";
import Link from "next/link";

interface PublishersClientProps {
  publishers: Publisher[];
}

export default function PublishersClient({
  publishers,
}: PublishersClientProps) {
  const searchParam = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParam.get("search") || "";
  const sortBy = searchParam.get("sortBy") || "name";
  const sortOrder = searchParam.get("order") || "asc";

  const filteredPublishers = publishers
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.country.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const valA = a[sortBy as keyof Publisher];
      const valB = b[sortBy as keyof Publisher];
      if (valA === undefined) return 1;
      if (valB === undefined) return -1;
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (column: string) => {
    const params = new URLSearchParams(searchParam.toString());
    if (sortBy === column) {
      params.set("order", sortOrder === "asc" ? "desc" : "asc");
    } else {
      params.set("sortBy", column);
      params.set("sortOrder", "asc");
    }
    params.delete("page"); // reset to page 1
    router.push(`?${params.toString()}`);
  };

  const currentPage = parseInt(searchParam.get("page") || "1");
  const publishersPerPage = 4;
  const startIndex = (currentPage - 1) * publishersPerPage;
  const endIndex = startIndex + publishersPerPage;
  const totalPages = Math.ceil(filteredPublishers.length / publishersPerPage);

  const paginatedPublishers = filteredPublishers.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Publishers
      </h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          defaultValue={searchQuery}
          onChange={(e) => {
            const params = new URLSearchParams(searchParam.toString());
            if (e.target.value) {
              params.set("search", e.target.value);
            } else {
              params.delete("search");
            }
            params.delete("page");
            router.push(`?${params.toString()}`);
          }}
          placeholder="Search by name or country..."
          className="w-full max-w-md px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Showing {filteredPublishers.length}{" "}
        {filteredPublishers.length === 1 ? "publisher" : "publishers"}
      </p>

      {/* Table */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              {[
                { label: "Name", key: "name" },
                { label: "Country", key: "country" },
                { label: "Founded", key: "foundedYear" },
                { label: "Books", key: "books" },
              ].map(({ label, key }) => (
                <th
                  key={key}
                  className="px-6 py-4 font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  <button
                    onClick={() => handleSort(key)}
                    className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                  >
                    {label}
                    <span className="text-xs">
                      {sortBy === key
                        ? sortOrder === "asc"
                          ? " ↑"
                          : " ↓"
                        : " ↕"}
                    </span>
                  </button>
                </th>
              ))}
              <th className="px-6 py-4 font-semibold text-zinc-700 dark:text-zinc-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {paginatedPublishers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400"
                >
                  No publishers found.
                </td>
              </tr>
            ) : (
              paginatedPublishers.map((publisher) => (
                <tr
                  key={publisher.id}
                  className="bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-50">
                    {publisher.name}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    {publisher.country}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    {publisher.foundedYear}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    {getBooksByPublisherId(publisher.id).length}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/publishers/${publisher.id}`}
                      className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 underline underline-offset-2"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-700">
            <th>
              <button onClick={() => handleSort("name")}>
                Name{" "}
                {sortBy === "name" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("country")}>
                Country{" "}
                {sortBy === "country" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("foundedYear")}>
                Founded{" "}
                {sortBy === "foundedYear"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : "↕"}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("books")}>
                Books{" "}
                {sortBy === "books" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedPublishers.map((publisher) => (
            <tr key={publisher.id}>
              <td>
                <Link href={`/publishers/${publisher.id}`}>
                  {publisher.name}
                </Link>
              </td>
              <td>{publisher.country}</td>
              <td>{publisher.foundedYear}</td>
              <td>{getBooksByPublisherId(publisher.id).length}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          const params = new URLSearchParams(searchParam.toString());
          params.set("page", String(page));
          router.push(`?${params.toString()}`);
        }}
      />
    </div>
  );
}
