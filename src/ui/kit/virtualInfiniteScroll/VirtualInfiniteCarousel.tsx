import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, ReactNode } from "react";

import classes from "./VirtualInfiniteCarousel.module.scss";

type TBaseFetchFunctionParams = {
  pageNumber: number;
};

type TProps<ItemT, FetchFunctionParamsT> = {
  queryKey: unknown[];
  itemWidthPixels: number;
  carouselHeightPixels: number;
  fetchFunction: (
    params: FetchFunctionParamsT
  ) => Promise<{ items: ItemT[]; nextPage: number; count: number }>;
  initialFetchFunctionParams: FetchFunctionParamsT;
  renderItem: (item: ItemT) => ReactNode;
};

export default function VirtualInfiniteCarousel<
  ItemT,
  FetchFunctionParamsT extends TBaseFetchFunctionParams
>(props: TProps<ItemT, FetchFunctionParamsT>) {
  const {
    queryKey,
    itemWidthPixels,
    carouselHeightPixels,
    fetchFunction,
    initialFetchFunctionParams,
    renderItem,
  } = props;

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [...queryKey, initialFetchFunctionParams],
      initialPageParam: 0,
      queryFn: ({ pageParam }) =>
        fetchFunction({ ...initialFetchFunctionParams, pageNumber: pageParam }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const allItems = data ? data.pages.flatMap((d) => d.items) : [];
  const count = data?.pages[0].count;

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: allItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemWidthPixels,
    paddingStart: 16,
    horizontal: true,
    overscan: 6,
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
    <div
      className={classes.carousel}
      style={{
        height: `${carouselHeightPixels}px`,
        position: "relative",
      }}
      ref={parentRef}
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
              width: `${virtualRow.size}px`,
              transform: `translateX(${virtualRow.start}px)`,
            }}
          >
            {renderItem(item)}
          </div>
        );
      })}
    </div>
  );
}
