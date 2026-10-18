import { profileData } from "../../../data/profile.js";

export function contactMethod(id) {
  const social = profileData.socials.find((item) => item.label.toLowerCase() === id);
  if (!social || social.configured === false || !social.url) return null;
  if (id === "email" ? !social.url.startsWith("mailto:") : !social.url.startsWith("https://")) return null;
  return social;
}

export function openContact(id) {
  const social = contactMethod(id);
  if (!social) return;
  if (social.external) window.open(social.url, "_blank", "noopener,noreferrer");
  else window.location.href = social.url;
}
