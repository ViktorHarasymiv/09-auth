"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
import clsx from "clsx";

import css from "./SidebarNotes.module.css";

const NotesSidebar = () => {
  const pathname = usePathname();
  const tagsList = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

  return (
    <ul className={css.menuList}>
      {tagsList.map((tag, index) => {
        return (
          <li key={index} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={clsx(
                css.menuLink,
                pathname === `/notes/filter/${tag}` && css.active
              )}
            >
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NotesSidebar;
