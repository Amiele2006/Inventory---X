"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between items-center w-full">
      <button
        className="rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={currentPage <= 1}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Previous
      </button>
      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={currentPage >= totalPages}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;