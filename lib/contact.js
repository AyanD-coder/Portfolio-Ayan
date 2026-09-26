import { siteData } from "@/lib/site-data";

export function getContactEmailHref() {
  return `mailto:${siteData.contact.email}?subject=${encodeURIComponent(
    "Software engineering opportunity",
  )}&body=${encodeURIComponent(
    "Hi Ayan,\n\nI found your portfolio and would like to discuss a software engineering opportunity.\n\nRole / company:\nWork arrangement:\nUseful details:\n",
  )}`;
}
