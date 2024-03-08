import { useRouter } from "next/navigation";
import { MouseEvent, useTransition } from "react";

export function useNextLink() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    const element = event.currentTarget as HTMLAnchorElement;
    const href = element.getAttribute("href");

    if (href) {
      event.preventDefault();

      startTransition(() => {
        router.push(href);
      });
    }
  };

  return { isPending, onClick };
}
