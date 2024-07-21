import { fetchPosts, TPost } from "../data/fetchPosts";
import Card from "../ui/kit/card/Card";
import VirtualInfiniteCarousel from "../ui/kit/virtualInfiniteScroll/VirtualInfiniteCarousel";

const CAROUSEL_PAGE_SIZE = 10;
const CARD_WIDTH = 360;
const CARD_HEIGHT = 393;
const CAROUSEL_GAP = 16;

export default function InfiniteCarouselPage() {
  return (
    <VirtualInfiniteCarousel<TPost, TFetchFunctionParams>
      queryKey={["posts-carousel"]}
      itemWidthPixels={CARD_WIDTH + CAROUSEL_GAP}
      carouselHeightPixels={CARD_HEIGHT}
      fetchFunction={fetchPostsCarousel}
      initialFetchFunctionParams={{ pageNumber: 0 }}
      renderItem={(post) => <Card post={post} key={post.id} />}
    />
  );
}

type TFetchFunctionParams = {
  pageNumber: number;
};

async function fetchPostsCarousel(params: TFetchFunctionParams) {
  const { pageNumber } = params;

  const { items, count } = await fetchPosts(
    pageNumber * CAROUSEL_PAGE_SIZE,
    CAROUSEL_PAGE_SIZE
  );

  return { items, count, nextPage: pageNumber + 1 };
}
