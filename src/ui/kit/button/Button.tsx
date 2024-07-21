import clsx from "clsx";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import classes from "./Button.module.scss";

type TProps = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: TProps) {
  const { children, className, ...rest } = props;

  return (
    <button type="button" className={clsx(classes.button, className)} {...rest}>
      {children}
    </button>
  );
}
