import classNames from "classnames";
import { ComponentProps } from "react";

export const MainPanel = (props: ComponentProps<"main">) =>
  <main {...props} className={classNames(props.className, "p-10 flex flex-col min-h-screen justify-end")} />