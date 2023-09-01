import classNames from "classnames";
import { ComponentProps } from "react";
import Link from 'next/link'

export const Anchor = (props: ComponentProps<typeof Link>) =>
  <Link {...props} className={classNames(props.className, "text-4xl font-bold")} />