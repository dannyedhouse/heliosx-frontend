interface Link {
  text: string;
  url: string;
}

interface FooterProps {
  usefulLinks: Link[];
  contactLinks: Link[];
}

export const Footer = ({ usefulLinks, contactLinks }: FooterProps) => {
  return (
    <footer className="bg-[#045a9b] text-white sticky bottom-0 z-50 w-full p-4">
      <div className="w-full max-w-[1172px] mx-auto">
        <div className="flex w-full justify-center md:justify-around text-center md:text-left">
          <div className="hidden md:block">
            <h2>
              <b>Useful links</b>
            </h2>
            <ul className="list-none" aria-label="useful links list">
              {usefulLinks.map((link, i) => (
                <a href={link.url} key={link.url + i}>
                  <li>{link.text}</li>
                </a>
              ))}
            </ul>
          </div>
          <div>
            <h2>
              <b>Contact us</b>
            </h2>
            <ul className="list-none" aria-label="contact links list">
              {contactLinks.map((link, i) => (
                <a href={link.url} key={link.url + i}>
                  <li>{link.text}</li>
                </a>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
