export function ContactLinks() {
  const contacts = [
    ["WhatsApp", "https://wa.me/5511977140452"],
    ["Instagram", "https://www.instagram.com/fabbioboli/"],
    ["LinkedIn", "https://www.linkedin.com/in/fabbio-boli/"],
    ["GitHub", "https://github.com/Fabbio-Boli"],
    ["E-mail", "mailto:fabinho871@live.com"],
  ];
  return <ul className="contact-links">{contacts.map(([label, href]) => <li key={label}><a href={href}>{label} <span aria-hidden="true">↗</span></a></li>)}</ul>;
}
