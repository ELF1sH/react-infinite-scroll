import { useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, ReactNode } from "react";

type TBaseFetchFunctionParams = {
  pageNumber: number;
};

type TProps<ItemT, FetchFunctionParamsT> = {
  queryKey: unknown[];
  itemHeightPixels: number;
  fetchFunction: (
    params: FetchFunctionParamsT
  ) => Promise<{ items: ItemT[]; nextPage: number; count: number }>;
  fetchFunctionParams: FetchFunctionParamsT;
  renderItem: (item: ItemT, idx: number) => ReactNode;
  overscan?: number;
};

export default function VirtualInfiniteList<
  ItemT,
  FetchFunctionParamsT extends TBaseFetchFunctionParams
>(props: TProps<ItemT, FetchFunctionParamsT>) {
  const {
    queryKey,
    itemHeightPixels,
    fetchFunction,
    fetchFunctionParams,
    renderItem,
    overscan = 5,
  } = props;

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [...queryKey, fetchFunctionParams],
      initialPageParam: 0,
      queryFn: ({ pageParam }) =>
        fetchFunction({ ...fetchFunctionParams, pageNumber: pageParam }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const allItems = data ? data.pages.flatMap((d) => d.items) : [];
  const count = data?.pages[0].count;

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useWindowVirtualizer({
    count: allItems.length,
    estimateSize: () => itemHeightPixels,
    horizontal: false,
    overscan,
    scrollMargin:
      (parentRef.current?.getBoundingClientRect().top ?? 0) +
      document.documentElement.scrollTop,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem || !count || lastItem.index >= count - 1) return;

    if (
      lastItem.index >= allItems.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allItems.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  return (
    <div ref={parentRef}>
      <div
        style={{
          width: "100%",
          position: "relative",
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = allItems[virtualRow.index];

          return (
            <div
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${
                  virtualRow.start - rowVirtualizer.options.scrollMargin
                }px)`,
              }}
            >
              {renderItem(item, virtualRow.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
