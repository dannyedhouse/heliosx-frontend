import "./App.css";
import { ConsultationForm } from "./components/ConsultationForm/ConsultationForm";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background flex justify-center">
          <div className="container">
            <div className="flex justify-between h-full">
              <div className="p-4 m-auto lg:m-0">{<ConsultationForm />}</div>
              <img
                src="./hero.png"
                width={400}
                height={400}
                className="hidden lg:block self-center"
              ></img>
            </div>
          </div>
        </main>
        <Footer
          usefulLinks={[
            {
              text: "Delivery info",
              url: "https://www.medexpress.co.uk/delivery",
            },
            {
              text: "FAQ",
              url: "https://www.medexpress.co.uk/faq",
            },
            {
              text: "Reviews",
              url: "https://www.medexpress.co.uk/reviews",
            },
          ]}
          contactLinks={[
            {
              text: "Send us a message",
              url: "https://support.medexpress.co.uk/hc/en-gb/requests/new",
            },
          ]}
        />
      </div>
    </>
  );
}

export default App;
