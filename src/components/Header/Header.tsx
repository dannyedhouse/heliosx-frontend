export const Header = () => {
  return (
    <header className="bg-primary sticky top-0 z-50" role="heading">
      <div className="w-full max-w-[1172px] px-[16px] py-[16px] md:py-[24px] mx-auto">
        <div className="flex flex-row h-stack justify-center md:justify-start">
          <a href="https://www.medexpress.co.uk/">
            <img
              src="./MedExpress-logo.svg"
              alt="MedExpress logo"
              width={180}
              height={180}
            />
          </a>
        </div>
      </div>
    </header>
  );
};
