import { HTMLAttributes, ReactElement } from "react";

export type IconType =
  | "account"
  | "api-keys"
  | "billing"
  | "calendar"
  | "clock"
  | "close"
  | "comment"
  | "delete"
  | "delete-team"
  | "email"
  | "folder"
  | "legal"
  | "loading-spinner"
  | "logout"
  | "settings"
  | "show-more"
  | "support"
  | "team-members"
  | "test-suite"
  | "vertical-dots"
  | "warning";

export function Icon({
  className = "",
  type,
  ...rest
}: HTMLAttributes<SVGElement> & {
  className?: string;
  type: IconType;
}) {
  let path: string | ReactElement | null = null;
  switch (type) {
    case "account":
      path =
        "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z";
      break;
    case "api-keys":
      path =
        "M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z";
      break;
    case "billing":
      path =
        "M18,4H6C3.79,4,2,5.79,2,8v8c0,2.21,1.79,4,4,4h12c2.21,0,4-1.79,4-4V8C22,5.79,20.21,4,18,4z M16.14,13.77 c-0.24,0.2-0.57,0.28-0.88,0.2L4.15,11.25C4.45,10.52,5.16,10,6,10h12c0.67,0,1.26,0.34,1.63,0.84L16.14,13.77z M6,6h12 c1.1,0,2,0.9,2,2v0.55C19.41,8.21,18.73,8,18,8H6C5.27,8,4.59,8.21,4,8.55V8C4,6.9,4.9,6,6,6z";
      break;
    case "calendar":
      path =
        "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zm0-12H5V5h14v2zM7 11h5v5H7z";
      break;
    case "clock":
      path =
        "M15,1H9v2h6V1z M11,14h2V8h-2V14z M19.03,7.39l1.42-1.42c-0.43-0.51-0.9-0.99-1.41-1.41l-1.42,1.42 C16.07,4.74,14.12,4,12,4c-4.97,0-9,4.03-9,9s4.02,9,9,9s9-4.03,9-9C21,10.88,20.26,8.93,19.03,7.39z M12,20c-3.87,0-7-3.13-7-7 s3.13-7,7-7s7,3.13,7,7S15.87,20,12,20z";
      break;
    case "close":
      path =
        "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z";
      break;
    case "comment":
      path =
        "M3 2.57152C2.88634 2.57152 2.77733 2.61668 2.69695 2.69705C2.61658 2.77743 2.57143 2.88644 2.57143 3.00011V15.8577C2.57143 16.0943 2.76343 16.2863 3 16.2863H6.42857C6.76956 16.2863 7.09659 16.4218 7.33771 16.6629C7.57883 16.904 7.71429 17.2311 7.71429 17.5721V21.3265L12.3771 16.6635C12.618 16.4223 12.9448 16.2866 13.2857 16.2863H21C21.1137 16.2863 21.2227 16.2412 21.303 16.1608C21.3834 16.0804 21.4286 15.9714 21.4286 15.8577V3.00011C21.4286 2.88644 21.3834 2.77743 21.303 2.69705C21.2227 2.61668 21.1137 2.57152 21 2.57152H3ZM0 3.00011C0 1.34405 1.344 0 3 0H21C22.656 0 24 1.34405 24 3.00011V15.8577C24 16.6534 23.6839 17.4165 23.1213 17.9791C22.5587 18.5417 21.7957 18.8578 21 18.8578H13.8171L9.40629 23.2688C9.05698 23.618 8.61201 23.8557 8.12761 23.9521C7.64322 24.0484 7.14115 23.9989 6.68486 23.8099C6.22857 23.6209 5.83854 23.3009 5.56408 22.8903C5.28961 22.4797 5.14303 21.997 5.14286 21.5031V18.8578H3C2.20435 18.8578 1.44129 18.5417 0.87868 17.9791C0.31607 17.4165 0 16.6534 0 15.8577V3.00011Z";
      break;
    case "delete":
      path =
        "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z";
      break;
    case "delete-team":
      path =
        "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z";
      break;
    case "email":
      path =
        "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z";
      break;
    case "folder":
      path =
        "M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z";
      break;
    case "legal":
      path =
        "M21,5l-9-4L3,5v6c0,5.55,3.84,10.74,9,12c2.3-0.56,4.33-1.9,5.88-3.71l-3.12-3.12c-1.94,1.29-4.58,1.07-6.29-0.64 c-1.95-1.95-1.95-5.12,0-7.07c1.95-1.95,5.12-1.95,7.07,0c1.71,1.71,1.92,4.35,0.64,6.29l2.9,2.9C20.29,15.69,21,13.38,21,11V5z";
      break;
    case "loading-spinner":
      path =
        "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z";
      break;
    case "logout":
      path =
        "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z";
      break;
    case "settings":
      path =
        "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z";
      break;
    case "show-more":
      path = "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z";
      break;
    case "support":
      path = (
        <g xmlns="http://www.w3.org/2000/svg">
          <path d="M21,12.22C21,6.73,16.74,3,12,3c-4.69,0-9,3.65-9,9.28C2.4,12.62,2,13.26,2,14v2c0,1.1,0.9,2,2,2h1v-6.1 c0-3.87,3.13-7,7-7s7,3.13,7,7V19h-8v2h8c1.1,0,2-0.9,2-2v-1.22c0.59-0.31,1-0.92,1-1.64v-2.3C22,11.14,21.59,12.53,21,12.22z" />
          <circle cx="9" cy="13" r="1" />
          <circle cx="15" cy="13" r="1" />
          <path d="M18,11.03C17.52,8.18,15.04,6,12.05,6c-3.03,0-6.29,2.51-6.03,6.45c2.47-1.01,4.33-3.21,4.86-5.89 C12.19,9.19,14.88,11,18,11.03z" />
        </g>
      );
      break;
    case "team-members":
      path =
        "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z";
      break;
    case "test-suite":
      path =
        "M3 5.02058C3 3.90522 3.90522 3 5.02058 3H9.06172C10.1771 3 11.0823 3.90522 11.0823 5.02058V9.06172C11.0823 9.59762 10.8694 10.1116 10.4905 10.4905C10.1116 10.8694 9.59762 11.0823 9.06172 11.0823H7.61846V15.7008C7.61846 16.007 7.74011 16.3007 7.95664 16.5172C8.17317 16.7338 8.46685 16.8554 8.77308 16.8554H13.3915V15.4121C13.3915 14.2968 14.2968 13.3915 15.4121 13.3915H19.4533C20.5686 13.3915 21.4739 14.2968 21.4739 15.4121V19.4533C21.4739 19.9891 21.261 20.5031 20.8821 20.8821C20.5031 21.261 19.9891 21.4739 19.4533 21.4739H15.4121C14.8763 21.4739 14.3623 21.261 13.9833 20.8821C13.6044 20.5031 13.3915 19.9891 13.3915 19.4533V18.5873H8.77308C8.00752 18.5873 7.27332 18.2831 6.73199 17.7418C6.19066 17.2005 5.88654 16.4664 5.88654 15.7008V11.0823H5.02058C4.48469 11.0823 3.97075 10.8694 3.59181 10.4905C3.21288 10.1116 3 9.59762 3 9.06172V5.02058ZM5.02058 4.73192C4.94402 4.73192 4.87061 4.76233 4.81646 4.81646C4.76233 4.87061 4.73192 4.94402 4.73192 5.02058V9.06172C4.73192 9.22107 4.86124 9.35039 5.02058 9.35039H9.06172C9.13828 9.35039 9.21171 9.31997 9.26584 9.26584C9.31997 9.21171 9.35039 9.13828 9.35039 9.06172V5.02058C9.35039 4.94402 9.31997 4.87061 9.26584 4.81646C9.21171 4.76233 9.13828 4.73192 9.06172 4.73192H5.02058ZM15.4121 15.1235C15.3355 15.1235 15.2621 15.1539 15.208 15.208C15.1539 15.2621 15.1235 15.3355 15.1235 15.4121V19.4533C15.1235 19.6126 15.2528 19.7419 15.4121 19.7419H19.4533C19.5299 19.7419 19.6033 19.7115 19.6574 19.6574C19.7115 19.6033 19.7419 19.5299 19.7419 19.4533V15.4121C19.7419 15.3355 19.7115 15.2621 19.6574 15.208C19.6033 15.1539 19.5299 15.1235 19.4533 15.1235H15.4121Z";
      break;
    case "vertical-dots":
      path =
        "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z";
      break;
    case "warning":
      path =
        "M2.73 21h18.53c.77 0 1.25-.83.87-1.5l-9.27-16c-.39-.67-1.35-.67-1.73 0l-9.27 16c-.38.67.1 1.5.87 1.5zM13 18h-2v-2h2v2zm-1-4c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1z";
      break;
  }

  if (typeof path === "string") {
    path = <path d={path} />;
  }

  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      {path}
    </svg>
  );
}
