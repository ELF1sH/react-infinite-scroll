import React from "react";

import { fetchPosts, TPost } from "../data/fetchPosts";
import ListItem from "../ui/kit/card/ListItem";
import VirtualInfiniteList from "../ui/kit/virtualInfiniteScroll/VirtualInfiniteList";

const LIST_PAGE_SIZE = 20;
const ITEM_HEIGHT = 94;
const LIST_GAP = 4;

export default function InfiniteListPage() {
  return (
    <VirtualInfiniteList<TPost, TFetchFunctionParams>
      queryKey={["posts-list"]}
      itemHeightPixels={ITEM_HEIGHT + LIST_GAP}
      fetchFunction={fetchPostsList}
      fetchFunctionParams={{ pageNumber: 0 }}
      renderItem={(post) => <ListItem post={post} key={post.id} />}
    />
  );
}

type TFetchFunctionParams = {
  pageNumber: number;
};

async function fetchPostsList(params: TFetchFunctionParams) {
  const { pageNumber } = params;

  const { items, count } = await fetchPosts(
    pageNumber * LIST_PAGE_SIZE,
    LIST_PAGE_SIZE
  );

  return { items, count, nextPage: pageNumber + 1 };
}
