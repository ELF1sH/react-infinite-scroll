import classes from "./Card.module.scss";
import { TPost } from "../../../data/fetchPosts";
import Button from "../button/Button";

type TProps = {
  post: TPost;
};

export default function Card(props: TProps) {
  const { post } = props;
  const { id, userId, title, body } = post;

  return (
    <div className={classes.card}>
      <div className={classes.logo_wrapper}>
        <div className={classes.logo_inner_wrapper}>
          <div className={classes.logo_image} />
        </div>
      </div>
      <div className={classes.card__header_wrapper}>
        <h3 className={classes.header}>Rayson Web Dev</h3>
        <p className={classes.sub_header}>
          {`Post ${id} of the user ${userId}`}
        </p>
      </div>
      <div>
        <h2 className={classes.hero_header}>{title}</h2>
        <p className={classes.content}>{body}</p>
      </div>
      <Button>View Details</Button>
    </div>
  );
}
